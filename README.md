Theme: https://themepanthers.com/wp/lawnella/elementor-new/home-7/

Favicon Generator: https://favicon.pub/

Image Compressor: https://squoosh.app/

Analytics: https://eu.posthog.com/signup

Setup: https://posthog.com/docs/libraries/next-js?tab=Instrumentation+client

Reverse Proxy: https://posthog.com/docs/advanced/proxy

Emails: https://sendgrid.com/en-us

Image Hosting: https://cloudinary.com/

Content Layer: https://keystatic.com/

Bot Detection: https://cloud.google.com/security/products/recaptcha

Domain Hosting: https://porkbun.com/

## SendGrid email setup

This site sends emails on:

- Contact form submission
- Quote form submission
- Footer subscribe form submission

### Environment variables

Set these in `.env` (see `.env.example`):

- `SENDGRID_API_KEY` (SendGrid API key)
- `EMAIL_FROM` (a verified sender address in SendGrid)
- `EMAIL_ADMIN_TO` (the business inbox that receives notifications)

### Local testing

- Run `pnpm dev`
- Submit the forms on `/contact`, `/quote`, or the footer subscribe field
- Check the server console for errors if emails fail
