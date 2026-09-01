# Gayoung Kwak — Portfolio

Bilingual personal portfolio for **Gayoung Kwak (곽가영)**, focused on
healthcare AI, applied machine learning, public data, and software projects.

Built with **Next.js 16 App Router**, **React 19**, **TypeScript**,
**Tailwind CSS 4**, and **MDX**.

## Features

- English and Korean content with instant client-side language switching
- Research and project detail pages generated from structured metadata and MDX
- Responsive, accessible layout with reduced-motion support
- One-page English and Korean PDF résumés
- Static generation for all public portfolio pages

## Requirements

- Node.js 20.9 or newer
- npm 10 or newer
- Python 3.10 or newer only when regenerating the PDF résumés

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Additional commands:

```bash
npm run lint     # Run ESLint
npm run build    # Create the static production site in out/
```

## Project structure

```text
src/
├─ app/                         # App Router pages, metadata, and global styles
├─ components/                  # Shared navigation and portfolio UI
├─ content/
│  ├─ site.ts                   # Contact, education, experience, and skills
│  ├─ projects.ts               # Project metadata, links, tags, and media
│  ├─ research.ts               # Research metadata
│  └─ mdx/                      # Paired English and Korean long-form content
└─ lib/                         # Localization and detail-page types

public/
├─ images/                      # Images displayed on project pages
├─ logos/                       # Logos and icons displayed on the home page
├─ profile-gayoung-kwak.jpg
├─ resume-gayoung-kwak-en.pdf
└─ resume-gayoung-kwak-ko.pdf

references/                     # Source materials not served by the website
scripts/generate_resumes.py     # Generates the two one-page PDF résumés
```

## Editing portfolio content

Short bilingual strings use `{ en, ko }` objects in `src/content/*.ts`.
Long-form descriptions use paired MDX files:

```text
src/content/mdx/projects/<slug>.en.mdx
src/content/mdx/projects/<slug>.ko.mdx
```

To add a project:

1. Add its metadata to `src/content/projects.ts`.
2. Create matching English and Korean MDX files.
3. Put browser-facing media in `public/images/` or `public/logos/`.
4. Run `npm run lint` and `npm run build`.

## Media conventions

- Use descriptive lowercase kebab-case filenames, such as
  `dentiscan-demo.png`.
- Keep only files used by the website in `public/`.
- Store source decks, original images, and replaced assets in `references/`.
- Add meaningful English and Korean alternative text in the project metadata.

## Regenerating the résumés

The generator currently uses Segoe UI and Malgun Gothic from the Windows font
directory. Install the Python dependencies, then run:

```bash
python -m pip install reportlab pypdf
python scripts/generate_resumes.py
```

The script writes intermediate PDFs to `output/pdf/` and copies the final files
to `public/`. The `output/` directory is ignored by Git; the final PDFs in
`public/` should be committed.

## Deployment

The portfolio is deployed as a static Next.js export on GitHub Pages. The
repository should be named `gykwak03.github.io` so it is published as a GitHub
user site without an additional repository path.

1. Rename the GitHub repository from `gayoungkwak` to `gykwak03.github.io`.
2. In the repository, open **Settings → Pages**.
3. Set **Build and deployment → Source** to **GitHub Actions**.
4. Push to `main`. The workflow in `.github/workflows/deploy-pages.yml`
   builds and publishes the site automatically.

The public URL is:

```text
https://gykwak03.github.io/
```

The deployment workflow obtains the repository base path from GitHub Pages,
so links, images, and résumé PDFs also keep working if the project is deployed
temporarily from a project Pages path such as `/gayoungkwak/`.

## Content and contact

Portfolio content belongs to Gayoung Kwak. Contact information and external
profiles are maintained in `src/content/site.ts`.
