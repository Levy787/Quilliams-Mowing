# SEO runtime deployment notes

## L-02: `http://www` redirect

Verified on 27 July 2026:

1. `http://www.quilliamsmowing.co.uk/` returns a Vercel `308` to
   `https://www.quilliamsmowing.co.uk/`.
2. `https://www.quilliamsmowing.co.uk/` returns a second Vercel `308` to
   `https://quilliamsmowing.co.uk/`.

The first redirect is Vercel's HTTP-to-HTTPS edge handling and occurs before
Next.js evaluates repository-owned redirects. A `next.config.ts` or
`vercel.json` host redirect therefore cannot see the original HTTP request and
cannot truthfully guarantee a one-hop redirect.

Collapsing this chain requires a Vercel domain-level/edge change that sends the
HTTP `www` host directly to the HTTPS apex, or an upstream edge proxy that owns
that redirect. It requires production domain access and must be verified with a
fresh redirect trace after the change.

## L-03: CSP hardening boundary

Production no longer permits `'unsafe-eval'`. Development retains it because
React and Next.js use eval for enhanced debugging.

`'unsafe-inline'` remains temporarily for framework-generated inline scripts,
Google Analytics initialisation, and inline styles. Moving to a nonce would make
the affected routes dynamically rendered, so that change should only follow a
separate caching/performance decision and a production smoke test covering
analytics, Turnstile, maps, and all forms.
