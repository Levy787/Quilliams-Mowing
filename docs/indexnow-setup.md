# IndexNow Setup

IndexNow provides instant indexing notifications to Bing, Yandex, and Naver when content changes. Instead of waiting for crawlers to discover updates, you ping them directly.

## How it works

1. A key file at `public/6aa67e76d1540f4f36f507f3702f677c.txt` proves site ownership
2. A POST endpoint at `/api/indexnow` collects all site URLs (pages, blog posts, services, projects, areas) and submits them to `https://api.indexnow.org/indexnow`
3. The endpoint is protected with a Bearer token to prevent abuse

## Setup

### 1. Add the environment variable

In Vercel (or your `.env.local` for local testing), add:

```
INDEXNOW_SECRET=your-random-secret-here
```

Use any random string. This is just to prevent unauthorized calls to the endpoint.

### 2. Trigger manually after a deploy

```bash
curl -X POST https://quilliamsmowing.co.uk/api/indexnow \
  -H "Authorization: Bearer your-random-secret-here"
```

The response will confirm how many URLs were submitted:

```json
{
  "status": 200,
  "urlCount": 31,
  "message": "IndexNow ping sent successfully"
}
```

### 3. Automate after publishing or deployment

Run the same POST after any content publish or successful production deploy. The route builds its URL list from the repo content, including dynamic blog, project, service, and area routes, so a content publish should trigger this endpoint after the new build is live.

1. Go to Vercel > Project Settings > Git > Deploy Hooks
2. Or use a GitHub Action that runs the curl command after a successful deployment
3. For Keystatic/content publishing, call the endpoint from the publish workflow after the production deployment completes

Example GitHub Action step:

```yaml
- name: Ping IndexNow
  if: success()
  run: |
    curl -X POST https://quilliamsmowing.co.uk/api/indexnow \
      -H "Authorization: Bearer ${{ secrets.INDEXNOW_SECRET }}"
```

## Verification

- The endpoint target is hardcoded in `app/api/indexnow/route.ts` as `https://api.indexnow.org/indexnow`.
- `urlCount` should increase when new blog posts, projects, services, or area pages are added.
- If the response is not `200`, check the returned status first, then confirm `INDEXNOW_SECRET` is set in the production environment.

## Files

- `public/6aa67e76d1540f4f36f507f3702f677c.txt` - Key file (serves at site root)
- `app/api/indexnow/route.ts` - API endpoint
