# Claude Code instructions

Read and follow `AGENTS.md`; it is the canonical project guidance. Read
`.agent/project.toml` before accessing external services.

For PostHog, use only the project MCP server named
`posthog_quilliams_mowing`. Do not use a globally installed PostHog plugin or
connection for this repository because it may be authenticated to another
account.

On the first Claude Code session for this checkout, approve `.mcp.json`, open
`/mcp`, and authenticate `posthog_quilliams_mowing` with the account that owns
the Quilliams Mowing project.
