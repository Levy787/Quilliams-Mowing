# n8n Workflow Spec

This is the build spec for the first n8n version. Keep it as two workflows until the post style is proven.

## Workflow A: Generate Draft

Runs once per weekday, or manually while testing.

### Nodes

1. **Schedule Trigger**
   - Frequency: daily
   - Timezone: `Europe/London`
   - Suggested time: `06:30`

2. **Read Fact Table**
   - Google Sheets / Airtable / n8n Data Table
   - Filter:
     - `status = ready`
     - `scheduled_at <= now + 7 days`
   - Sort by `scheduled_at asc`
   - Limit: `1`

3. **IF: Has Fact**
   - If no row exists, stop.

4. **Optional: iNaturalist Reference Search**
   - HTTP Request:
     - Method: `GET`
     - URL: `https://api.inaturalist.org/v1/observations`
     - Query examples:
       - `q={{$json.search_terms}}`
       - `photos=true`
       - `quality_grade=research`
       - `per_page=5`
   - Use this for inspiration/source links only in v1.
   - In v2, add a licence filter and use only CC0/CC-BY compatible images.

5. **Build Image Prompt**
   - OpenAI text node or Code node.
   - Input:
     - `topic`
     - `organism_group`
     - `fact`
     - `image_prompt`
   - Output:
     - final image prompt
     - negative prompt notes, if the image API supports them

6. **Generate Image**
   - OpenAI Images.
   - Output size:
     - Preferred: `1080x1350`
     - Fallback: generate square and crop into `1080x1350`
   - Style direction:
     - natural macro photography
     - Cornwall/British garden feel
     - no text in generated image
     - no hands unless explicitly requested

7. **Upload Raw Image**
   - Cloudinary / S3 / n8n binary storage.
   - Save URL as `generated_image_url`.

8. **Render Fact Card**
   - Recommended first renderer: Bannerbear or Placid.
   - Template fields:
     - `background_image_url`
     - `fact`
     - `topic`
     - `brand_label`
     - optional `credit`
   - Output: `final_image_url`.

9. **Update Fact Row**
   - Set:
     - `status = generated`
     - `generated_image_url`
     - `final_image_url`
     - `notes = Ready for review`

10. **Notify**
   - Email / Slack / n8n app notification.
   - Message:
     - final image URL
     - caption
     - edit/approval instructions

## Workflow B: Publish Approved

Runs at the actual publish time. This avoids relying on Instagram scheduling behavior and keeps Facebook/Instagram aligned.

### Nodes

1. **Schedule Trigger**
   - Frequency: daily
   - Timezone: `Europe/London`
   - Suggested time: `08:00`

2. **Read Approved Post**
   - Filter:
     - `status = approved`
     - `scheduled_at <= now`
   - Sort by `scheduled_at asc`
   - Limit: `1`

3. **IF: Has Approved Post**
   - If no row exists, stop.

4. **Facebook Publish**
   - HTTP Request or Facebook Graph API node.
   - Target: Page photo/feed endpoint.
   - Payload:
     - image URL or uploaded binary
     - caption
   - For pre-scheduling through Facebook instead of n8n timing:
     - `published=false`
     - `scheduled_publish_time=<unix timestamp>`

5. **Instagram Create Media Container**
   - HTTP Request to Instagram Graph API.
   - Required fields:
     - `image_url={{final_image_url}}`
     - `caption={{caption}}`
   - Save returned media container ID as `instagram_media_id`.

6. **Wait / Poll Container Status**
   - Wait 10-30 seconds, then check status.
   - If finished, continue.
   - If failed, mark row `failed`.

7. **Instagram Publish Media**
   - HTTP Request to publish the container.
   - Save returned Instagram post ID.

8. **Update Fact Row**
   - Set:
     - `status = posted`
     - `facebook_post_id`
     - `instagram_media_id`
     - `instagram_post_id`

9. **Error Workflow**
   - On any API failure:
     - set `status = failed`
     - write `failure_reason`
     - notify Levi

## Minimum Environment Variables

```text
OPENAI_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
META_PAGE_ID=
META_PAGE_ACCESS_TOKEN=
INSTAGRAM_BUSINESS_ACCOUNT_ID=
BANNERBEAR_API_KEY=
```

If using Placid instead of Bannerbear:

```text
PLACID_API_TOKEN=
PLACID_TEMPLATE_ID=
```

## Approval Rule

Never publish rows with `status = generated`.

The row must be manually changed to `approved`. This one step protects the accounts while prompts, images, and text layout are being tuned.
