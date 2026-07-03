# MRI Plan Website

Production Next.js website for MRI Plan, an interactive MRI slice-planning simulator for MRI students and technologists.

## Architecture

- Next.js App Router with TypeScript
- Server components by default
- Client components only for navigation, accordion, and contact form behavior
- Global design tokens in `styles/globals.css`
- Reusable component styling in `styles/components.css` and section styling in `styles/sections.css`
- Structured content in `data/content.ts`
- Assets in `public/images`

## Routes

- `/`
- `/features`
- `/modules/brain-planning`
- `/modules/spine-planning`
- `/modules/msk-planning`
- `/about`
- `/faq`
- `/contact`
- `/launch`
- `/privacy-policy`
- `/terms`
- `/robots.txt`
- `/sitemap.xml`

## Commands

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

Deploy on Vercel:

```bash
vercel
```

## Environment Variables

The contact and launch forms are prepared for a JSON form endpoint.

```bash
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=
```

Until that variable is set, the form validates input but does not fake a successful submission. Visitors are directed to email `contact@mriplanapp.com`.

## Content Updates

Edit reusable business content in `data/content.ts`:

- navigation
- planning modules
- feature copy
- process steps
- trust metrics
- FAQ items
- contact topics

Legal pages live in `app/privacy-policy/page.tsx` and `app/terms/page.tsx`.

## Deployment Notes

- `public/CNAME` preserves the `mriplanapp.com` custom domain.
- `app/sitemap.ts` and `app/robots.ts` generate deployment-ready SEO files.
- Typography uses a production-safe system font stack so local and CI builds do not depend on fetching remote font files.
- Images are served from `public/images` and referenced with Next.js `<Image />` where appropriate.
