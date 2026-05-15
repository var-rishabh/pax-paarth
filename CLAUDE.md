# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project overview

**Pax-Paarth** is a premium packaging solutions company. This is their complete marketing website — a static, single-page site with no backend. Designed by Ree-Infinity Technologies (website: https://www.reeinfinitytech.com/).

**Business contact details** (used throughout the site — keep consistent):
- Phone 1: +91 92201 46877
- Phone 2: +91 92201 45811
- Email: info@paxpaarth.com
- Facebook: https://www.facebook.com/share/1Bcgo2ZdS4/
- Instagram: https://www.instagram.com/paxpaarth/
- WhatsApp: https://wa.me/919220146877

---

## Serving locally

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

No build step, no package manager, no transpilation. Changes are live on browser refresh.

---

## File structure

```
pax-paarth/
├── index.html          ← entire site (single page)
├── css/
│   ├── main.css        ← ACTIVE: all styles for the current site
│   ├── font-awesome/   ← FA 4.x icon font (used via <i class="fa fa-...">)
│   │   ├── css/font-awesome.min.css
│   │   └── fonts/      ← fontawesome webfont files
│   ├── micons/         ← legacy icon font, NOT used
│   ├── base.css        ← legacy grid, NOT used
│   ├── vendor.css      ← legacy plugin styles, NOT used
│   └── fonts.css       ← legacy @font-face for Montserrat/Libre Baskerville, NOT used
├── js/
│   ├── main.js         ← ACTIVE: all JS for the current site (vanilla, no jQuery)
│   ├── plugins.js      ← legacy jQuery plugin bundle, NOT used
│   └── jquery-2.1.3.min.js ← legacy jQuery, NOT used
├── images/
│   ├── logo.png        ← brand logo, 462×385 RGBA PNG, used in navbar + footer
│   ├── hero-bg.jpg     ← hero section background, 2500×2000 JPEG
│   ├── image1.jpg      ← product: Luxury Gift Wraps, 1920×1920 JPEG
│   ├── image2.png      ← product: Premium Tissue Paper, 3072×3072 PNG
│   ├── image3.png      ← product: Custom Printed Packaging, 3072×3072 PNG
│   ├── image4.png      ← product: Branded Carrier Bags, 3840×3840 PNG
│   ├── image5.png      ← product: Specialty Gift Boxes, 2048×2048 PNG
│   ├── image6.png      ← product: Bulk Packaging Solutions, 3072×3072 PNG
│   └── ree.png         ← 25000×25000 vendor watermark file, DO NOT USE
└── fonts/
    ├── montserrat/     ← legacy webfont files, NOT loaded
    └── librebaskerville/ ← legacy webfont files, NOT loaded
```

Only `index.html`, `css/main.css`, `js/main.js`, `css/font-awesome/`, and the `images/` folder are active.

---

## HTML structure (`index.html`)

Single `<body>` with the following elements in order:

| Element | id / class | Purpose |
|---|---|---|
| Div | `#preloader` | Full-screen loader shown until `window.load` |
| Anchor | `.wa-float` | Fixed WhatsApp button (bottom-right) |
| Nav | `#nav` | Fixed top navbar |
| Div | `.mob-menu #mobMenu` | Full-screen mobile menu overlay |
| Section | `#home .hero` | Full-viewport hero |
| Section | `#about` | About + stats |
| Section | `#products` | 6-product grid |
| Section | `#why-us` | 6 feature cards |
| Section | `#contact` | Contact info + order form |
| Footer | — | Logo, links, contact, copyright |

### Navbar (`#nav`)
- Logo: `<a class="nav-logo"><img src="images/logo.png"></a>`
- Links: `.nav-links ul` — Home, About, Products, Why Us, plus `<a class="nav-btn">Order Now</a>` (gold pill button)
- Mobile: `.burger#burger` (hamburger toggle)

### Mobile menu (`.mob-menu#mobMenu`)
- Close: `.mob-close#mobClose`
- Links: `<a class="mob-link">` — each closes the menu on click
- "Order Now" link has extra class `.mob-order` (gold colour)
- Contact bar at bottom: `.mob-contact` with phone + email anchors

### Hero (`#home`)
- Background: `.hero-bg` (CSS sets `background-image: url('../images/hero-bg.jpg')`)
- Overlay: `.hero-veil` (gradient darkens the image)
- Content: `.hero-body` — all text/buttons, centred
  - `.hero-tag.ha` — eyebrow label with decorative `<span>` lines
  - `h1.hero-title.ha` — "Pax`<em>-</em>`Paarth" (em makes the dash gold)
  - `p.hero-sub.ha` — tagline
  - `.hero-actions.ha` — `.btn-gold` (Order Now) + `.btn-line` (See Our Products)
  - `animation-delay` set inline on each `.ha` element
- Social: `.hero-social ul` — Facebook + Instagram (hidden on mobile)
- Scroll hint: `.hero-scroll` — animated mouse + "Scroll" label (hidden on mobile)

### About (`#about`)
- Layout: `.about-grid` (CSS grid, 2 columns)
- Left `.about-copy`: eyebrow, `h2`, two `<p>`, `.btn-gold`
- Right `.about-stats`: 4 × `.stat.rv` cards
  - Each stat: `<span class="stat-n" data-target="500" data-suffix="+">0</span>` + `<span class="stat-l">`
  - Counter animation fires when the card enters the viewport

### Products (`#products`)
- `.prod-grid` — CSS grid, 3 columns (2 on tablet, 1 on mobile ≤768px, max-width 420px)
- 6 × `.prod-card.rv[data-delay]`:
  - `.prod-img` — `aspect-ratio:1/1`, overflow hidden
    - `<img>` — zooms on hover
    - `.prod-over` — dark overlay with `.prod-cta` "Order Now" button (fades in on hover)
  - `.prod-foot` — title `h3` + `.prod-link` "Enquire →" anchor

### Why Us (`#why-us`)
- `.feat-grid` — 3 columns (2 on tablet, 1 on mobile)
- 6 × `.feat.rv[data-delay]`:
  - `.feat-icon` — icon box with `<i class="fa fa-...">` 
  - `h3` + `<p>`
  - Gold bottom-border slides in on hover (`::after` pseudo-element)

### Contact (`#contact`)
- `.contact-grid` — 2 columns (1 on mobile)
- Left `.contact-left`: eyebrow, `h2`, `<p>`, `.cinfo` (3 contact cards)
  - `.ccard` — phone (tel: link), email (mailto: link), WhatsApp (wa.me link)
  - WhatsApp card has extra `.ccard-wa` class (green icon)
- Right `.contact-right`: `<form id="orderForm">`
  - Fields: `#f-name`, `#f-phone`, `#f-email`, `#f-msg`
  - All use floating-label pattern (input has `placeholder=" "`, followed by `<label>`)
  - Submit → JS constructs `mailto:info@paxpaarth.com` with form data

### Footer
- `.ft-top` — 3-column grid: `.ft-brand` (logo + tagline + social), 2 × `.ft-col` (Quick Links, Contact)
- `.ft-bottom` — copyright + designer credit

---

## CSS architecture (`css/main.css`)

### Design tokens (`:root`)

```css
--bg      #07070e   /* darkest background */
--bg2     #0d0d1a   /* about, why-us sections */
--bg3     #111120   /* contact section, form */
--card    rgba(255,255,255,0.03)  /* card backgrounds */

--gold    #c9a84c   /* primary gold */
--gold2   #e4c06e   /* lighter gold (hover states) */
--gold3   #9e7e2c   /* darker gold (gradient start) */

--white   #ffffff
--t1      rgba(255,255,255,0.92)  /* primary text */
--t2      rgba(255,255,255,0.52)  /* secondary text / body copy */

--border  rgba(201,168,76,0.22)   /* gold border on hover */
--bsub    rgba(255,255,255,0.07)  /* subtle border default state */

--nav-h   78px     /* also read by JS for smooth scroll offset */
--r       14px     /* standard border-radius */
--ease    cubic-bezier(.25,.46,.45,.94)
--fh      'Playfair Display', Georgia, serif  /* headings */
--fb      'Inter', system-ui, sans-serif      /* body */
```

### Fonts

Loaded via Google Fonts CDN in `<head>`:
```
Playfair Display: 700 italic, 700 normal, 900 normal
Inter: 300, 400, 500, 600
```

Icons via Font Awesome 4.x (`css/font-awesome/css/font-awesome.min.css`). Use `<i class="fa fa-[name]">`.

### Key utility classes

| Class | Effect |
|---|---|
| `.rv` | Scroll-reveal target: starts `opacity:0; transform:translateY(36px)`, JS adds `.in` |
| `.rv.in` | `opacity:1; transform:none` |
| `[data-delay="100|200|300|400|500"]` | Adds `transition-delay` (in steps of 0.1s) to stagger grid items |
| `.ha` | Hero animation: `opacity:0; animation:haUp .85s forwards` — fires on page load via inline `animation-delay` |
| `.btn-gold` | Gold gradient pill button (works on `<a>` and `<button>`) |
| `.btn-gold.full-w` | Full-width version of btn-gold |
| `.btn-line` | Ghost/outline button |
| `.eyebrow` | Small uppercase gold label above section headings |
| `.sec-head` | Centred section header wrapper (max-width 580px) |
| `.wrap` | Page content container (max-width 1180px, 24px padding) |

### Responsive breakpoints

| Breakpoint | Changes |
|---|---|
| `≤1024px` | Products → 2-col grid; Features → 2-col grid; Footer → 2-col |
| `≤768px` | Nav links hidden → hamburger shown; about stack to 1 col; products → 1 col (max-w 420px); features → 1 col; contact → 1 col; hero bg-attachment becomes scroll |
| `≤480px` | Hero CTAs stack vertically; form row → 1 col; form padding reduced |

### Animation system

**Scroll reveal (`.rv`)**
- IntersectionObserver in `main.js` adds `.in` when element is 12% in viewport (with -40px rootMargin)
- Transition: `opacity .7s + transform .7s` with `--ease`
- Stagger via `data-delay` → CSS `transition-delay`

**Hero (`.ha`)**
- CSS `animation: haUp .85s var(--ease) forwards`
- `animation-delay` set inline in HTML (0.35s, 0.55s, 0.75s, 0.95s)
- Completely independent of IntersectionObserver

**Preloader**
- Logo: `@keyframes plFade` — opacity 0→1 at 0.15s
- Progress bar: `@keyframes plBar` — width 0→100% at 0.25s (1.1s duration)
- Hidden: `#preloader.gone` sets `opacity:0; visibility:hidden`

**WhatsApp button**
- `@keyframes waBounce` — delayed 1.8s, scale 0.6→1.1→1

**Product cards**
- Image: `scale(1.07)` on `.prod-card:hover`
- Overlay: `opacity 0→1` on hover
- CTA button: `translateY(12px)→0` on hover

**Feature cards**
- `translateY(-6px)` + border + shadow on hover
- `::after` gold bottom-border: `scaleX(0)→scaleX(1)` on hover

**Counters**
- IntersectionObserver (threshold 0.6) on `.stat-n[data-target]`
- JS `requestAnimationFrame` loop with ease-out cubic, 1600ms duration

**Hero parallax**
- `scroll` listener moves `.hero-bg` with `translateY(scrollY * 0.18px)` + base `scale(1.04)`

---

## JS architecture (`js/main.js`)

Single self-executing IIFE, no dependencies. Execution order:

1. **Preloader** — `window.load` → 1.5s delay → `#preloader.classList.add('gone')`
2. **Navbar** — `scroll` → adds/removes `#nav.solid` at scrollY > 60px
3. **Active link** — `scroll` → highlights `.nav-links a` matching visible section
4. **Mobile menu** — `#burger` click → `.mob-menu.open`; `.mob-close` / `.mob-link` click → close; `body.locked` prevents scroll behind menu
5. **Smooth scroll** — all `a[href^="#"]` → offset by `--nav-h` CSS variable
6. **Scroll reveal** — `IntersectionObserver` on all `.rv` elements → adds `.in`
7. **Counter** — `IntersectionObserver` on `.stat-n[data-target]` → animates number from 0 to `data-target`, appending `data-suffix`
8. **Hero parallax** — `scroll` on `.hero-bg` (only while scrollY < innerHeight)
9. **Form submit** — `#orderForm` submit → builds `mailto:info@paxpaarth.com?subject=...&body=...` from fields `#f-name`, `#f-phone`, `#f-email`, `#f-msg`

---

## Adding / editing content

**Add a new product card** — copy a `.prod-card` block in `#products`, update `img src`, `alt`, `h3` text.

**Change a stat number** — update `data-target` attribute on `.stat-n` (JS reads this to animate).

**Add a new feature** — copy a `.feat` block in `#why-us`, change the `fa-` icon class and text. Use `data-delay` in multiples of 100 (up to 500) for stagger.

**Add a new section** — give it an `id`, add a matching `<a href="#id">` in `.nav-links` and `.mob-menu nav`. The smooth-scroll and active-link JS will pick it up automatically.

**Change brand colour** — edit `--gold`, `--gold2`, `--gold3` in `:root`.

---

## Known legacy files (safe to ignore or delete)

- `css/base.css` — old 12-column grid system
- `css/vendor.css` — styles for jQuery plugins (Flexslider, Waypoints, Masonry, lightgallery)
- `css/fonts.css` — `@font-face` for Montserrat + Libre Baskerville (replaced by Google Fonts CDN)
- `css/micons/` — icomoon icon font set, not referenced anywhere
- `js/plugins.js` — bundled jQuery plugins (Masonry, Waypoints, Flexslider, ajaxChimp, FitVids)
- `js/jquery-2.1.3.min.js` — jQuery (all JS is now vanilla)
- `fonts/` directory — local webfont files for the above fonts
