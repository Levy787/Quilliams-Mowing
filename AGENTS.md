# Quilliams Mowing agent instructions

Read `.agent/project.toml` before using any external service. It is the
non-secret source of truth for this website's repository and analytics IDs.

## External systems

- GitHub: operate on `Levy787/Quilliams-Mowing`.
- Google Search Console: always pass
  `sc-domain:quilliamsmowing.co.uk` explicitly.
- Google Analytics: always pass property `501971583` explicitly. The web
  measurement ID is `G-0W4NCH9D70`.
- PostHog: use only the `posthog_quilliams_mowing` MCP server and project
  `111836`. The global `posthog` server belongs to another account and is
  intentionally disabled for this repository.

## Safety

- Treat analytics, Search Console, and PostHog as read-only unless the user
  explicitly requests a write.
- Do not fall back to another account, organization, property, or project when
  an expected connector is unavailable. Report the mismatch instead.
- Never commit OAuth tokens, API keys, downloaded credential JSON, `.env`, or
  `.env.local`. Only placeholder values belong in `.env.example`.
- Do not change production configuration, deploy, push, merge, or mutate remote
  repository state unless the user requests it.

## Development

- Use `pnpm`.
- Run `pnpm lint` for focused changes and `pnpm build` when build-level
  validation is warranted.
- Preserve unrelated working-tree changes.
