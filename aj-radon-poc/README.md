# A&J Radon Away: website proof of concept

Static, mobile-first redesign proof of concept. HTML, CSS and vanilla JS. No build step.

## Pages
- `index.html` Home
- `how-it-works.html` Mitigation infographic and FAQ
- `about.html` About
- `contact.html` Contact

## Deploy on GitHub Pages
1. Push this repo to GitHub.
2. Settings, Pages, Source: Deploy from a branch, `main`, `/ (root)`.
3. Open `https://<user>.github.io/<repo>/`.

## Before launch
- Replace `assets/icon.svg` with the client's logo.
- Point the forms in `app.js` at a form service. They currently open a prefilled email draft.
- Replace the Google reviews link in `index.html` with the client's Google Business Profile link.
- Swap in higher resolution hero photography.

Design tokens: `tokens.json`. Audit notes: `AUDIT.md`.
