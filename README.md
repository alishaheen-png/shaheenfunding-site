One-page site for shaheenfunding.com. Static HTML, no build step, no tracking. GitHub Pages serves `main` from the root, so a push to `main` is live.

- `index.html`, `404.html`: the pages. All copy matches the product brief PDF; change one, change the other.
- `site.css`: the whole design. Every colour, size and duration is a token in `:root`.
- `site.js`: builds the "Get in touch" email draft links at runtime. No address is written in the HTML as text.
- `fonts/`: self-hosted Big Shoulders Display, Readex Pro and the Nunito wordmark subset (all OFL).
- `d/`, `sig/`, `Shaheen-Funding-Product-Brief.pdf`, `CNAME`: linked from outside the site. Never move or rename.

The pages send a Content-Security-Policy meta tag that allows only same-origin CSS and JS, so no inline `style=""` or inline scripts.
