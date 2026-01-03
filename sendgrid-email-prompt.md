# Prompt: Add SendGrid emails (Contact, Quote, Subscribe)

You are working in a Next.js **16.1** App Router project (TypeScript) in this
repo. The current UI for `/contact`, `/quote`, and the footer subscribe form is
**MVP-only** (it simulates submit and does not call a backend). Implement
**SendGrid** email sending, with a dedicated folder of reusable email templates.

## Goal

Send emails when:

1. A user submits the **Contact** form
2. A user submits the **Quote** form
3. A user submits the **Email Subscribe** form in the footer

### Email behavior

For each submission type:

- Send an **internal notification email** to the business inbox (admin)
- Send a **confirmation email** to the user (where an email is provided)

## Hard constraints

- **Do not change the UX** (no new pages/modals; keep the existing UI/flow).
- Keep the current styling and components.
- Do not introduce new design tokens.
- Use **Next.js Route Handlers** under `app/api/**/route.ts`.
- Ensure the email sending runs in **Node runtime** (not Edge).

## Current code locations (important)

- Contact form component: `app/(marketing)/contact/ContactClient.tsx`
  - Currently simulates submit with `setTimeout`.
- Quote form component: `app/(marketing)/quote/QuoteClient.tsx`
  - Currently simulates submit.
  - It supports selecting up to 6 images (File objects) on the client.
- Footer subscribe form UI: `components/layout/Footer.tsx`
  - Currently does `preventDefault()` only.

## Implementation tasks

### 1) Add SendGrid dependency

- Install `@sendgrid/mail`.
- Do not add other email libraries unless truly necessary.

### 2) Add env vars

Support these environment variables (document them in `README.md` and/or
`.env.example`):

- `SENDGRID_API_KEY` (required)
- `EMAIL_FROM` (required; verified sender in SendGrid)
- `EMAIL_ADMIN_TO` (required; where internal notifications go)

Optional (if you implement subscribe double-opt-in later; not required now):

- `SITE_URL`

Implementation note:

- For **admin notification** emails, set `replyTo` to the user’s email (when
  available) so replying in Gmail/Apple Mail goes directly to the customer.

### 3) Create an email template folder

Create a folder at repo root:

- `emails/templates/`

Add these template modules (TypeScript):

- `emails/templates/contact-admin.ts`
- `emails/templates/contact-user.ts`
- `emails/templates/quote-admin.ts`
- `emails/templates/quote-user.ts`
- `emails/templates/subscribe-admin.ts`
- `emails/templates/subscribe-user.ts`

Template contract (keep it simple, no extra deps):

- Each template exports a function that takes `data` and returns:
  - `subject: string`
  - `html: string`
  - `text: string`

Use small, readable HTML strings (tables optional). Keep them plain and
compatible with email clients.

### 4) Add a small SendGrid wrapper

Create:

- `lib/email/sendgrid.ts`

It should:

- Read env vars safely
- Initialize `@sendgrid/mail`
- Export `sendEmail({ to, from, subject, html, text, replyTo? })`
- Fail gracefully with clear errors (don’t leak secrets)

### 5) Add API routes

Create three route handlers:

- `app/api/contact/route.ts`
- `app/api/quote/route.ts`
- `app/api/subscribe/route.ts`

All three should:

- `export const runtime = "nodejs";`
- Accept `POST` only
- Validate incoming data (minimal manual validation is fine)
- Return JSON `{ ok: true }` on success, `{ ok: false, error: string }` on
  failure

Response conventions:

- Use `NextResponse.json(...)`.
- Return `400` for validation errors and `500` for unexpected failures.
- Never return secrets (API keys, stack traces).

Validation guidance (keep minimal):

- Trim strings.
- Ensure required fields are non-empty.
- Reject obviously invalid emails (simple `@` check is acceptable for MVP).
- Add a cheap anti-abuse check (honeypot OR rate limit).

#### Contact payload

Accept JSON:

```json
{
    "name": "string",
    "email": "string",
    "phone": "string | null",
    "service": "string | null",
    "message": "string"
}
```

- Send admin email (includes all fields)
- Send user confirmation (thanks + what happens next)

#### Quote payload

Accept JSON:

```json
{
    "name": "string",
    "email": "string",
    "phone": "string | null",
    "address": "string | null",
    "serviceType": "string",
    "timeframe": "string | null",
    "budget": "string | null",
    "jobDetails": "string | null",
    "calculatorSummary": "string | null"
}
```

- Send admin email with all details
- Send user confirmation

**Important note about photos**: the current form supports selecting photos
client-side. For an MVP, do **not** attempt to email attachments (it can exceed
SendGrid limits and complicates parsing). Instead:

- Include in the email a note like “Photos not attached via website; we’ll
  request them by reply if needed.”
- (Optional later) implement uploads to storage and include links.

#### Subscribe payload

Accept JSON:

```json
{ "email": "string" }
```

- Send admin email: “New subscriber: …”
- Send user email: welcome / confirmation

### 6) Wire the UI to call the API

#### Contact

Update `ContactClient.tsx`:

- Replace the simulated submit with a
  `fetch("/api/contact", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(payload) })`.
- Keep the existing loading/submitted/toast behavior.

#### Quote

Update `QuoteClient.tsx`:

- Replace the simulated submit with a `fetch("/api/quote", ...)`.
- Keep the existing validation UX.
- Do not include files in the payload for now.

#### Subscribe

Update `Footer.tsx`:

- Add local state for the input value.
- On submit, call `fetch("/api/subscribe", ...)`.
- Show a success toast (use `sonner`) and clear the field.

### 7) Basic abuse protection (minimal)

Implement at least one of:

- Simple honeypot field (client + server)
- Basic in-memory rate limit per IP (best-effort)

Keep it minimal and do not change UI layout.

## Acceptance criteria

- Submitting Contact sends:
  - 1 email to admin
  - 1 email to user
- Submitting Quote sends:
  - 1 email to admin
  - 1 email to user
- Subscribing sends:
  - 1 email to admin
  - 1 email to user
- Build passes: `pnpm build`
- No new pages/components; only the minimum wiring + templates + routes.

## Deliverables (files)

- New:
  - `emails/templates/*.ts`
  - `lib/email/sendgrid.ts`
  - `app/api/contact/route.ts`
  - `app/api/quote/route.ts`
  - `app/api/subscribe/route.ts`
- Updated:
  - `app/(marketing)/contact/ContactClient.tsx`
  - `app/(marketing)/quote/QuoteClient.tsx`
  - `components/layout/Footer.tsx`
  - `README.md` (env vars + local testing notes)
