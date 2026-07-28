# Analytics and conversion QA

## Internal traffic exclusion

Routine browser and agent QA should not create GA4 or PostHog events.

1. Open any production page once with
   `?analytics_traffic=internal`, for example:
   `https://quilliamsmowing.co.uk/?analytics_traffic=internal`.
2. The site stores a first-party `qm_internal_traffic=1` cookie for one year,
   removes the query parameter from the address bar, and suppresses GA4 and
   PostHog capture in that browser.
3. To restore ordinary capture, open any page once with
   `?analytics_traffic=external`.

This control affects analytics only. Forms, Turnstile, email delivery, and the
rest of the production experience continue to work normally.

Use a clean browser profile without the internal-traffic cookie when explicitly
validating analytics delivery. Label any resulting test lead clearly so it can
be excluded from business reporting.

## Event matrix

No event below includes a visitor's name, email address, phone number, message,
postcode, uploaded filename, or other free-text form value.

| Site event | Trigger | Useful parameters | GA4 event |
|---|---|---|---|
| `form_start` | First focus, pointer interaction, submit, or native validation in the contact or quote form | `form_name`, `path` | `form_start` |
| `form_validation_error` | Native browser validation or a custom contact, Turnstile, or photo validation failure | `form_name`, `field_name`, `validation_type` | `form_validation_error` |
| `contact_submit_attempt` | Valid contact form begins its API request | form and contact-method booleans | `contact_submit_attempt` |
| `contact_submit_failed` | Contact API response or client exception fails | `failure_stage`, status/error type | `contact_submit_failed` |
| `contact_submit_success` | Contact API confirms successful delivery | status and non-PII form properties | `contact_submit_success` |
| `conversion_contact_submit` | Same confirmed contact success | `source=contact`, status | `generate_lead`, `method=contact_form` |
| `quote_submit_attempt` | Quote form starts submission | service/timeframe/budget categories and non-PII booleans | `quote_submit_attempt` |
| `quote_submit_failed` | Quote validation, API response, or client exception fails | failure stage and status/error type | `quote_submit_failed` |
| `quote_submit_success` | Quote API confirms successful delivery | status and non-PII form properties | `quote_submit_success` |
| `conversion_quote_submit` | Same confirmed quote success | status and non-PII form properties | `generate_lead`, `method=quote_form` |
| `quote_optional_details_toggle` | Quote optional section is opened or closed | `expanded` | `quote_optional_details_toggle` |
| `click_phone` | A tracked telephone action is selected | `location` | `click_phone` |
| `click_email` | Any sitewide `mailto:` link is selected | `location`, `path` | `click_email` |
| `click_whatsapp` | A tracked WhatsApp action is selected | location/tooltip context | `click_whatsapp` |

Only confirmed successful form responses map to GA4 `generate_lead`.

## Production delivery smoke test

The business owner should complete this after deployment:

1. Use a clean browser without the internal-traffic cookie.
2. Submit one quote containing the words `INTERNAL DELIVERY TEST`.
3. Confirm the success UI appears.
4. Confirm the real admin notification arrives.
5. If an email address was supplied, confirm the customer acknowledgement
   arrives.
6. Confirm one `quote_submit_success`, one `conversion_quote_submit`, and one
   GA4 `generate_lead` event. Record the timestamp so the test can be removed
   from lead totals.
