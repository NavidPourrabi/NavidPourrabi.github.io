# navidpourrabi.github.io

Personal portfolio for Navid Pourrabi: product and UX, with a film and motion background.
Static site: HTML, CSS, and a little JS. No build step, no framework.

**Live at https://navidpourrabi.github.io/**

## Structure

```
index.html                          → home: intro + timeline, Extendsell, motion, about, contact
resume.html                         → résumé + PDF download
case-studies/
  extendsell.html                   → Extendsell case study
  case-study-template.html          → copy this for a new project
assets/
  css/style.css                     → tokens at the top, then all styles
  js/main.js                        → theme toggle, mobile menu, header border, footer year
  images/extendsell-*               → Figma exports used in the case study
  images/navid-workshop.jpg         → photo in the hero
  resume-navid-pourrabi.pdf         → downloadable résumé
```

## Editing the timeline in the hero

Each clip in `index.html` has `style="--s:…;--e:…"`. Those are positions in years from the
start of 2020, so `--s:2;--e:5.5` runs from January 2022 to mid-2025. The board covers
2020 to 2027. The playhead and the "moved to the Netherlands" marker use `--at` the same way.
Move the playhead's `--at` forward as time goes on.

## Design

- Palette: `#0038BC` blue, `#FCFCFC` paper, `#373D20` olive ink, `#1B998B` teal, `#D63230` red.
  Teal and red are darkened in the CSS so they pass contrast as text.
- Type: Young Serif for headings, Schibsted Grotesk for everything else (Google Fonts).
- Light by default. Dark mode is a toggle and is remembered.
- One animation: the playhead runs to "now" on load. It's off for people who prefer reduced motion.

## Still to do

- **Résumé PDF is out of date.** Regenerate `assets/resume-navid-pourrabi.pdf` from `resume.html`
  (print the page to PDF works; the print styles hide the header and buttons).

## Preview locally

```bash
npx --yes serve . -l 8123
```

## Deploy

This is a user site, so any push to `main` is live within a minute or two.
