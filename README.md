# navidpourrabi.github.io

Personal portfolio for Navid Pourrabi — UI/UX designer, product, and motion designer.
Static site: HTML, CSS, and a little JS. No build step, no framework.

**Live at https://navidpourrabi.github.io/**

## Structure

```
index.html                          → home (hero + metrics, work, about, process, contact)
resume.html                         → full résumé + PDF download
case-studies/
  extendsell.html                   → Extendsell — add-ons & frequently bought together
  case-study-template.html          → duplicate this for each new project (noindexed)
assets/
  css/style.css                     → design tokens + all styles
  js/main.js                        → theme toggle, mobile nav, scroll reveal
  images/extendsell-*.png           → Figma exports used in the case study
  images/thumb-*.jpg                → Vimeo stills for the work cards
  images/navid-workshop.jpg         → photo used in the About section
  resume-navid-pourrabi.pdf         → downloadable résumé
```

## Still to do

- **Real Vimeo titles are now in place.** If any label is wrong, edit the `#motion` section.
- **Extendsell outcomes** — the case study carries no metrics yet, deliberately. Add them
  once measured; don't publish a number that can't be backed up.
- **Two more photos** — the headshot and the café photo were never saved to disk; only
  the workshop photo made it in. Drop them in `assets/images/` to use them.

## Design system

All tokens live in `:root` at the top of `assets/css/style.css`:

- `--paper` near-white base, `--ink` dark olive, `--line` hairline
- `--sage` primary accent, `--clay` secondary accent — both AA-contrast checked
- `--font-display` / `--font-body` Instrument Sans, `--font-voice` Instrument Serif italic
- Light is the default for everyone; the OS setting is deliberately ignored. Dark
  overrides sit in the `[data-theme=dark]` block

Change a token, the whole site follows.

## Preview locally

```bash
npx --yes serve . -l 8123
```

Then open `http://localhost:8123`.

## Deploy

This is a **user site**, so any push to `main` publishes automatically at the root domain
within a minute or two. No build, no action to run — which also means anything pushed is
immediately public.

## Notes

- Fonts load from Google Fonts via `<link>` — nothing to install
- Theme respects the visitor's OS setting on first visit, then remembers their choice in
  `localStorage`; an inline script in each `<head>` applies it before first paint
- All content is visible with JS disabled — the scroll animation is progressive enhancement
