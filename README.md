# Portfolio Website

A clean, modern, static UX/product design portfolio — no build tools, no framework, just HTML/CSS/JS. Open `index.html` in a browser and it works.

## Structure

```
index.html                          → home page (hero, work grid, about, process, contact)
case-studies/
  case-study-template.html          → duplicate this for each project
assets/
  css/style.css                     → design system + all styles
  js/main.js                        → dark mode toggle, mobile nav, scroll reveal
  images/                           → put your photos/screenshots here
```

## Fill in your content

Search each HTML file for these and replace them with your own:

- **Name & title** — `<title>` tags and the logo in the header (`Navid<span>.</span>`)
- **Hero copy** — headline, subhead, and the `hero-meta` stats in `index.html`
- **Work grid** — 4 sample project cards in `index.html`. Each links to `case-studies/case-study-template.html`; duplicate that file per project (e.g. `case-study-01.html`) and update the `href`
- **Case study content** — every section in the template (`Problem`, `Research`, `Exploring the solution`, `Final design`, `Outcome`, `Reflection`) has placeholder copy in plain English describing what to write
- **Images** — `.img-placeholder` divs and the gradient `.work-thumb` blocks are stand-ins. Replace with `<img src="assets/images/your-file.jpg" alt="...">` once you have real screenshots/photos
- **Contact links** — `mailto:you@example.com`, LinkedIn/Behance/Dribbble URLs appear in the `#contact` section and the footer
- **Résumé** — add a PDF at `assets/resume-navid-pourrabi.pdf` (the download button in the hero already links there)

## Preview locally

Just open `index.html` in your browser, or run a tiny local server so relative paths and fonts behave exactly like production:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Then visit `http://localhost:8000`.

## Push to GitHub

```bash
git add .
git commit -m "Add initial portfolio site"
git push origin main
```

(If your default branch is `master` instead of `main`, use that instead.)

## Deploy for free with GitHub Pages

1. On GitHub, go to your repo → **Settings → Pages**
2. Under **Build and deployment**, set **Source** to `Deploy from a branch`
3. Pick the `main` branch and `/ (root)` folder, then **Save**
4. GitHub will publish the site at `https://<your-username>.github.io/Portfolio-Website/` within a minute or two

## Notes

- Fonts (Fraunces + Inter) load from Google Fonts via `<link>` tags in each page's `<head>` — no local install needed
- Dark mode toggle is in the top-right nav; it respects the visitor's OS preference on first load
- The design system (colors, spacing, type scale) lives entirely in `assets/css/style.css` under `:root` — change the tokens there to restyle the whole site at once
