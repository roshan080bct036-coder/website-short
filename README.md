# Dubi Nanda Dhakal - portfolio website

A single-page academic portfolio for **Prof. Dr. Dubi Nanda Dhakal**, professor of
linguistics at the Central Department of Linguistics, Tribhuvan University.

Static frontend only. No framework, no build step, no dependencies to install.
Open `index.html` in a browser and it runs. The content editor is at `admin.html`.

```
D:\MamaWebsite
├── index.html            # page structure
├── admin.html            # visual content editor with live preview
├── assets
│   ├── css/styles.css     # portfolio styling (light + dark themes)
│   ├── css/admin.css      # content editor styling
│   ├── js/data.js         # ← ALL CONTENT lives here. Edit this to update the site.
│   ├── js/main.js          # rendering + interactions
│   ├── js/admin.js         # editor, local drafts, preview and export
│   └── img/                # drop the portrait photo here (see img/README.txt)
└── README.md
```

## Editing content

The editor at `admin.html` lets you change portfolio content, reorder or add
entries, manage publications, adjust section visibility and colors, and preview
the site at desktop or mobile width. Drafts are saved in the current browser.

This is a static website, so the editor cannot publish files to the web host. To
publish a draft, choose **Download site data** in the editor, replace
`assets/js/data.js` with the downloaded file, and redeploy the site. Use
**Export backup** and **Import backup** to move a draft between browsers.

The editor has no account or password system. Anyone with access to the editor
URL can change the draft in their own browser, but changes reach the public site
only when the exported data file is deployed.

Everything shown on the page comes from **`assets/js/data.js`**:
bio, metrics, research areas, the list of languages, projects, and the full
publications list. Each publication is one object:

```js
{ year: 2024, type: "article",
  title: "A phylogenetic study of South-Western Tibetic",
  authors: "D. N. Dhakal, J.-M. List and S. Roberts",
  venue: "Journal of Language Evolution 9(1-2), 14-28",
  cites: 6, featured: true,
  url: "https://academic.oup.com/jole/article/9/1-2/14/7850294" }
```

- `type`: `"book"`, `"article"`, `"report"` or `"conference"` (drives the filter tabs)
- `featured: true`: the item shows in the default view before "Show all publications"
- `cites`: optional Google Scholar citation count
- `url`: optional link (DOI or publisher page). Omit it and the entry is plain text.

Writing the author string as `D. N. Dhakal` makes that name bold automatically.

## Things to confirm before publishing

These are marked with `TODO` comments in `assets/js/data.js`:

1. **Email address** - currently `dubinanda.dhakal@fohss.tu.edu.np`. Verify the
   current institutional address.
2. **Devanagari name** - currently `दुबिनन्द ढकाल` in the hero. Adjust the spelling
   if a different form is preferred, or set `nameDevanagari: ""` to hide it.
3. Skim the publications list against Google Scholar and add DOIs where wanted.

The portrait photo (`assets/img/dubi-nanda-dhakal.jpg`) is in place. To swap it,
replace that file with another square or portrait JPG of the same name.

## Deploying

Any static host works. Drag the folder onto **Netlify Drop**, or:

**GitHub Pages**
```bash
git init && git add . && git commit -m "Portfolio site"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
Then enable Pages on the `main` branch in the repository settings.

## Optional: self-host the fonts

The page loads **Newsreader** and **IBM Plex Sans** from Google Fonts. For a fully
self-contained site, download the WOFF2 files, drop them in `assets/fonts/`, add
`@font-face` rules at the top of `styles.css`, and remove the two `fonts.googleapis.com`
`<link>` tags from `index.html`.

## Accessibility & behaviour

- Works without JavaScript (shows a short bio and a Google Scholar link).
- Light / dark themes follow the system setting; the sun/moon button overrides and
  remembers the choice.
- Respects `prefers-reduced-motion` (all scroll reveals and smooth scrolling turn off).
- Keyboard navigable, skip link, semantic landmarks, visible focus rings.
- `Ctrl/Cmd + P` prints a clean version with the full publication list expanded.
