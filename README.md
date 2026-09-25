# Thirupati Rice Mill — Karur
### Premium multi-page business website — demo build (7 pages)

**Headline concept:** *Pure Grain. Trusted Tradition.*
**Design direction:** deep forest green + warm ivory + muted terracotta + rice-gold · large editorial photography · elegant serif display type · generous whitespace · smooth scrolling and subtle scroll animations.

---

## 1. Pages in this build

| File | Page | What it contains |
|---|---|---|
| `index.html` | **Home** | The full 9-section homepage: cinematic hero, brand story, six-rice product showcase, Why Thirupati, Paddy → Rice process rail, parallax mill band, quality/trust, food lifestyle, dark CTA |
| `about.html` | **About** | Founding story, 1994 → today milestone timeline, four values, "mill in numbers" band, proprietor quote |
| `rice.html` | **Our Rice** | All six varieties in detail (grain, process, cooking, best for, pack sizes), pack-size table, wholesale & private-label section |
| `quality.html` | **Quality** | Three QC checkpoints, full parameters table (moisture, broken %, discolouration…), hygiene & storage checklist, traceability story |
| `process.html` | **Our Process** | The six stages in detail with photography, facility capacity band, monthly-consistency section |
| `gallery.html` | **Gallery** | 20-photo grid with a full-screen lightbox (keyboard + arrow navigation) |
| `contact.html` | **Contact** | Enquiry form (opens WhatsApp with details filled in), contact cards, map panel with Google Maps link, "how to reach", 5-question FAQ |

Every page carries the same header (Home · About · Our Rice · Quality · Our Process · Gallery · Contact) with the current page highlighted, the same footer, the same WhatsApp float and back-to-top button. **All seven pages are fully functional** — the demo placeholders are now limited to social links, Privacy/Terms and the rates signup.

### Structure

```
thirupati-rice-mill/
├── index.html  about.html  rice.html  quality.html
├── process.html  gallery.html  contact.html
├── README.md
└── assets/
    ├── css/style.css      ← one stylesheet for the whole site (design system + all components)
    ├── js/main.js         ← one script: preloader, sticky header, mobile drawer, scroll reveals,
    │                         counters, parallax, lightbox, enquiry form, demo toasts
    └── images/            ← 20 photographs
```

---

## 2. How to preview / run it

**Option A — double click**
Open `index.html` in any browser. It is a fully static site; the nav will work between pages.

**Option B — local server** (recommended)

```bash
cd thirupati-rice-mill
python3 -m http.server 8000
# open http://localhost:8000
```

---

## 3. Going live (5 minutes)

1. Upload the whole `thirupati-rice-mill` folder to any hosting — Hostinger, cPanel, Netlify, Vercel, GitHub Pages. Nothing to build or compile.
2. Point the domain (e.g. `thirupatiricemill.in`) at it and enable SSL.
3. Search and replace the placeholders below.

| Placeholder | Where it appears | Replace with |
|---|---|---|
| `+91 98765 43210` / `+91 98765 43211` | every page header, contact page, footer | real phone numbers |
| `https://wa.me/919876543210` | all WhatsApp buttons + enquiry form | real WhatsApp number |
| `sales@thirupatiricemill.in` | footer, contact page | real email |
| `Ramanathapuram Road, Karur – 639001` | contact page, footer, mobile menu | real mill address |
| Google Maps link | contact page map panel | your pinned location |
| `Since 1994`, `30+ years`, `18 T/day`, `500+ T/month` | hero, about, process, quality | your real figures |
| Social links (`#`) | footer, all pages | real Instagram / Facebook / YouTube |
| Photography | all 20 images | your own mill, machinery, staff and rice photos |

**Two things worth knowing**
- The **contact form** currently composes the enquiry and opens WhatsApp. To email instead, point `form[data-enquiry]` at your mail service or add a PHP/Formspree endpoint — the handler lives near the end of `assets/js/main.js`.
- The **map** is a designed panel with an "Open in Google Maps" button rather than an embedded iframe, so the layout never breaks. To embed the real map, replace the `.map-card` inner content with your Google Maps `<iframe>`.

---

## 4. Design system

Colour tokens at the top of `assets/css/style.css`:

```css
--forest-900 #0B1F17   deep forest green (primary dark)
--ivory      #F8F4EA   warm ivory (page background)
--terracotta #B4653F   muted terracotta (accents, eyebrows)
--gold       #C9A227   rice-gold (buttons, rules, numerals)
--ivory-2    #F2EBDC   alternating section background
```

Typography: **Cormorant Garamond** for display headlines (with italic accent phrases), **Inter** for body and UI.

Reusable components already in the stylesheet: `.btn` (gold / forest / ghost / outline / WhatsApp), `.page-hero` + breadcrumb, `.split`, `.timeline`, `.value-card`, `.stage-card`, `.stat-band`, `.rice-detail` + `.spec-list`, `table.data`, `.quote-band`, `.check-grid`, `.gallery-grid` + lightbox, `.card-panel` + form fields, `.contact-card`, `.map-card`, `.faq`, `.final` CTA band.

Everything is responsive (4-col → 2-col → 1-col), the desktop nav becomes a full-screen staggered drawer on mobile, and `prefers-reduced-motion` switches off all animation.

---

## 5. Notes

- Animations used: ken-burns hero zoom, scroll reveals, animated stat counters, parallax mill band, self-drawing process rail, marquee ticker, card hover lifts, gallery lightbox.
- Performance: hero image is `fetchpriority="high"`, every other image is `loading="lazy"`; one stylesheet and one script for the whole site.
- Fonts load from Google Fonts. For fully offline hosting, download the two families into `assets/fonts/` and swap the `<link>` for local `@font-face` rules.
- Page copy is written as realistic placeholder content — prices, names and figures should be confirmed with the owner before launch.
- Photography in this build is AI-generated demo imagery. Swapping in real photographs of your own mill, machinery, paddy and rice will always outperform stock imagery.
