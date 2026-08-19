# Portfolio Website — Navid Pourrabi

Static UX/product portfolio. No build tools, no framework — HTML, CSS, and a little JS.
Open `index.html` in a browser and it works.

## Structure

```
index.html                          → home (hero + metrics, work grid, about, process, contact)
resume.html                         → full résumé page + PDF download button
case-studies/
  extendsell.html                   → Extendsell case study (add-ons + frequently bought together)
  case-study-template.html          → duplicate this for each new project
assets/
  css/style.css                     → design tokens + all styles
  js/main.js                        → dark mode toggle, mobile nav, scroll reveal
  images/                           → your photos and screenshots go here
  resume-navid-pourrabi.pdf         → drop your PDF here (resume.html already links to it)
```

## Before you publish — fill in the placeholders

Search all HTML files for `[` — every `[SQUARE BRACKET]` is a placeholder that must be
replaced with a real value. Do not publish with brackets visible. The main ones:

| Where | What to replace |
| --- | --- |
| `index.html` hero | The four numbers in `.metric-band`. Delete any metric you can't back up. |
| `index.html` work grid | Project slots 2 and 3 — real projects, or delete the cards |
| `index.html` about + timeline | Your own paragraphs, job titles, and dates |
| `case-studies/extendsell.html` | Every `[X]`, plus a real merchant quote and the outcome stats |
| `resume.html` | Roles, dates, education, languages |
| All pages | LinkedIn / Behance handles (currently `your-handle`) |
| `assets/images/` | Portrait, project covers, and the `.img-placeholder` blocks |

**On the numbers:** three real metrics beat six invented ones. If a figure was never
measured, delete the block rather than guessing — the layout handles fewer items.

## Design system

Everything lives in `:root` at the top of `assets/css/style.css`:

- `--color-accent` (warm persimmon) — headings, links, emphasis
- `--color-data` (slate blue) — metrics and outcome numbers only
- `--font-display` Fraunces (serif headlines), `--font-body` Inter
- Dark mode overrides sit in the `[data-theme='dark']` block right below

Change a token there and the whole site follows.

## Adding a project

1. `cp case-studies/extendsell.html case-studies/your-project.html`
2. Replace the content
3. In `index.html`, point the matching `.work-card` `href` at the new file

## Preview locally

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy with GitHub Pages

This repo is a **user site** (`NavidPourrabi.github.io`), so anything pushed to `main`
publishes automatically at the root domain:

**https://navidpourrabi.github.io/**

No subpath, no build step. If Pages isn't switched on yet: repo → **Settings → Pages**
→ **Source** = `Deploy from a branch` → branch `main`, folder `/ (root)` → **Save**.

Changes go live a minute or two after each push. Because it publishes on push, don't
push while any `[PLACEHOLDER]` is still in the HTML.

## Notes

- Fonts load from Google Fonts via `<link>` — no local install
- Dark mode respects the visitor's OS setting on first load, then remembers their choice
- Content is fully visible with JS disabled; the scroll animation is progressive enhancement
