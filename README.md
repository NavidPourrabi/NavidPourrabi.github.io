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
  resume-navid-pourrabi.pdf         → downloadable résumé
```

## Still to do

- **Motion reel titles** — the six Vimeo embeds in the `#motion` section came from the
  old portfolio labelled only "Video 1–6". Give each a real project name and reorder so
  the motion work leads.
- **Extendsell outcomes** — the case study deliberately carries no metrics yet. Add them
  once measured; don't publish a number that can't be backed up.
- **Film work** — the Oghdei and student-film cards on the home page don't link anywhere.
  If either deserves a full case study, copy `case-study-template.html`.

## Design system

All tokens live in `:root` at the top of `assets/css/style.css`:

- `--color-accent` (persimmon) — headings, links, emphasis
- `--color-data` (slate blue) — metrics and outcome numbers only
- `--font-display` Fraunces (serif headlines), `--font-body` Inter
- Dark mode overrides sit in the `[data-theme='dark']` block below it

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
