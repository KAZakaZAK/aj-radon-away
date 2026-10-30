# A&J Radon Away: UX/UI Audit and PoC Plan

Source: client screenshots (Home, About, Blog, Contact, chat widget, Book Today popup). Site is a Wix build.

## 1. Gap Analysis

### Eliminate
- Blog page. It is a "coming soon" dead end in the primary nav.
- Separate About page. Its content is thin and repeats the homepage copy.
- Duplicate chat launcher plus popup plus contact form. Three competing lead paths.
- Letter-spaced thin headings ("G E T  I N  T O U C H", "A b o u t") that hurt scanning.
- Blue-to-pale-blue gradient banner on About (low contrast with white title).
- Gold chat header with light text and the lime-on-blue review cards.

### Fix
- Hero text sits on a busy photo with a thin weight. Move to a solid dark panel with 40px+ bold type.
- Mission body copy is small, light gray on white. Raise to 16px, high contrast.
- Review cards use a photo overlay under white text. Replace with solid surfaces.
- Contact form uses placeholder-only fields with heavy borders. Add visible labels, 48px fields.
- Book Today popup opens as a half-empty full-screen split. Convert to a compact modal with one phone field.
- Required marks are inconsistent (Email required on home, optional on Contact).
- "Let's Chat" button overlaps content and the Submit area on mobile.
- Phone and email are plain text in the footer. Make them tap-to-call and tap-to-email.
- Stats (10+ years, 1000 homes, 100%) are buried on About. Move them under the hero.

### Introduce
- Sticky mobile bar: Call and Book today, always reachable.
- Tap-to-call in the hero.
- Short "Test, Mitigate, Breathe easy" process section. Proposed copy, confirm with client.
- "Know your number" EPA 4 pCi/L callout.
- Licenses (RC409, RS356) as trust chips near the top, not only the footer.
- Dark-mode surface system, visible focus rings, 48px tap targets.
- Service area line (Central Ohio) in the hero and contact blocks.

### Needs client input
- Real logo files, hero and install photos, a services and pricing outline, review sources and dates, a form backend.

## 2. Figma Tokens
See `tokens.json`. Create as Figma Variables with collections: Color, Space, Radius, Type.

| Token | Value | Contrast |
|---|---|---|
| bg | #111111 | White 18.9:1 |
| surface | #1C1C1E | White 17.0:1 |
| surface-2 | #26262A | White 15.1:1 |
| text-muted | #B9BEC7 | 10.1:1 on bg |
| primary | #6EA2FF | 7.4:1 on bg |
| on-primary | #0B0B0C | 7.8:1 on primary |
| accent | #C5E84A | 13.5:1 on bg |
| danger | #FF8A8F | 6.7:1 on surface-2 |
| focus | #FFD666 | 13.5:1 on bg |

| Type | Mobile | Desktop | Weight |
|---|---|---|---|
| H1 | 40 | 64 | 700 |
| H2 | 24 | 32 | 700 |
| H3 | 20 | 20 | 700 |
| Lede | 18 | 18 | 500 |
| Body | 16 | 16 | 500 |
| Small | 14 | 14 | 500 |

Spacing: 8, 16, 24, 32, 40, 48, 64, 80. Radius: 8. Min tap target: 48x48. Font: Montserrat (matches client's current headings).

Auto-layout: cards use 24 padding, 16 gap. Page gutter 16 on mobile, 32 on tablet and up. Section padding 48 vertical.

## 3. 360px Mobile Blueprint
1. Header (64 tall): logo mark and wordmark left, 48x48 menu button right. Menu opens a full-width panel with 48px rows and a Book today button.
2. Hero: eyebrow, H1 "Stay safe with us.", lede, primary button "Request a call back" (48 tall, full width), secondary "Call 614-824-0849", three trust chips.
3. Stats: 3 equal tiles, number over label.
4. Process: three stacked cards, 48x48 number badge left.
5. Callout: EPA 4 pCi/L card with lime left rule.
6. About: heading, two short paragraphs, "Talk to our team" button, brand mark tile.
7. Reviews: horizontal scroll-snap row, cards at 85% width so the next card peeks.
8. Contact: heading, three tappable rows (phone, email, address), then form (Name, Phone, Email optional, Send request).
9. Footer: logo, address, license lines, copyright.
10. Sticky bar (fixed bottom): Call (1/3) and Book today (2/3), 48 tall.
Booking modal: logo mark, H2, one sentence, one phone field, submit, 48x48 close button.

## 4. Deployment
Files: `index.html`, `styles.css`, `app.js`, `sw.js`, `manifest.webmanifest`, `assets/icon.svg`, `tokens.json`.
1. Create a GitHub repo, push these files to the root of `main`.
2. Settings, Pages, Source: Deploy from branch, `main`, `/ (root)`.
3. Open `https://<user>.github.io/<repo>/` on a phone.
4. Replace `assets/icon.svg` with the client's logo and add hero photography when available.
5. Forms open a prefilled email draft (static hosting has no backend). For production, point the forms at Formspree or the client's CRM.
