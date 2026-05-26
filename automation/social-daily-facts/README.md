# Social Daily Facts Automation

Purpose: publish calm, useful daily facts about lawns, soil, plants, fungi, algae, and garden ecology to Facebook and Instagram without turning the account into a sales feed.

## Positioning

This should feel like a local garden field guide, not a home-service advert.

Working series name:

> Garden Fact of the Day

Caption CTA:

> Follow for daily facts about lawns, soil, and garden life.

Use the CTA lightly, ideally on every 2nd or 3rd post.

## Automation Shape

Start with two workflows instead of one fully autonomous pipeline:

1. `Generate Draft`
   - Pull one `ready` fact from the fact table.
   - Generate one original image from the prompt.
   - Render a branded fact card.
   - Save the final image URL and mark the row `generated`.

2. `Publish Approved`
   - Pull one `approved` row where `scheduled_at <= now`.
   - Publish to Facebook Page.
   - Publish to Instagram Business/Creator account.
   - Save platform IDs and mark the row `posted`.

This keeps quality control while the visual style is being dialled in.

## Data Table

Use Google Sheets, Airtable, Notion database, or n8n Data Tables with these columns:

```text
id
status
scheduled_at
topic
organism_group
fact
caption
cta
image_prompt
search_terms
source_url
source_license
source_credit
generated_image_url
final_image_url
facebook_post_id
instagram_media_id
instagram_post_id
failure_reason
notes
```

Statuses:

```text
idea
ready
generated
approved
posted
failed
skipped
```

## User Setup Tasks

1. Confirm the Instagram account is Business or Creator.
2. Connect Instagram to the Quilliams Facebook Page in Meta Business Suite.
3. Create or access an n8n workspace.
4. Create a Google Sheet or Airtable using the columns above.
5. Create an OpenAI API key for image generation.
6. Create a Cloudinary account or other public image host.
7. Choose a renderer:
   - Bannerbear or Placid for easiest templated graphics.
   - Cloudinary transformations if you want fewer tools.
   - Custom HTML screenshot renderer later if we want full control.
8. Create a Meta Developer app.
9. Add Facebook Login / Graph API access and generate a Page access token.
10. Add the Instagram Graph API permissions needed for content publishing.
11. Test one manual Facebook post through the Graph API.
12. Test one manual Instagram publish through the Instagram Graph API.

Do steps 1-4 first. Do not spend time polishing the AI image workflow until Meta posting works.

## API Notes

- n8n Schedule Trigger runs the daily workflow. Docs: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/
- n8n HTTP Request can call iNaturalist, Cloudinary, Bannerbear, Placid, and Meta Graph API. Docs: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/
- n8n has Facebook Graph API credentials support. Docs: https://docs.n8n.io/integrations/builtin/credentials/facebookgraph/
- Facebook Page publishing is through Meta Pages API. Docs: https://developers.facebook.com/docs/pages-api/posts/
- Instagram publishing is through Instagram Platform Content Publishing. Docs: https://developers.facebook.com/docs/instagram-platform/content-publishing/
- iNaturalist API docs: https://api.inaturalist.org/v2/docs/

## iNaturalist Licensing Rule

Do not treat AI regeneration as a way to bypass photo licensing.

iNaturalist says photos default to CC BY-NC unless changed by the contributor, which blocks commercial use. Because this is a business page, only use iNaturalist images directly when the image licence is clearly compatible, such as CC0 or CC BY with attribution. Otherwise use iNaturalist only for species/context research and generate a new image from a text prompt.

iNaturalist licensing help: https://help.inaturalist.org/en/support/solutions/articles/151000175695

## First Build Milestone

Milestone 1 should only do this:

```text
Google Sheet row
-> OpenAI image generation
-> Template renderer
-> Store final image URL
-> Manual approval
```

Milestone 2 adds Facebook.

Milestone 3 adds Instagram.

Milestone 4 adds optional iNaturalist enrichment.
