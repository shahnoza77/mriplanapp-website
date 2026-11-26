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

The Contact form sends email through a server-only App Router endpoint and Resend.

```bash
RESEND_API_KEY=
```

Configure this secret in Vercel for each environment that should send email. Never expose it through a `NEXT_PUBLIC_` variable.

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

## Email confirmation (local Phase 1 changes)

`/email-confirmed` treats URL data as untrusted. PKCE codes are handed to
`com.example.mriplanningapp://auth/email-confirmed` for the mobile SDK to exchange
using its original verifier. A code by itself never produces a success message.
Implicit callbacks can display success only after a fresh Supabase `/auth/v1/user`
response includes `email_confirmed_at`. The page does not persist a browser auth
session, consume PKCE codes, refresh tokens, or change account records.

The optional implicit-flow check requires these public **build-time** variables:

- `NEXT_PUBLIC_SUPABASE_URL`: the existing MRI Plan Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: that project's publishable key. Never
  use a secret or service-role key.

Without them, implicit callbacks show “We couldn’t check your verification status”
and still allow a secure handoff to the app. PKCE handoff needs neither variable.
No environment values or production settings were added by this change.

Run `npm test` with Node 22.18+ (native TypeScript stripping), `npm run lint`,
and `npx tsc --noEmit`. Tests use fake callback values and mocked network responses;
they do not send email or access real accounts. Run `npm run build` for the
production compilation check; this does not deploy.

Before deployment, manually check missing-result, expired/invalid, PKCE, implicit
success and network-failure states. Verify cold/warm Open MRI Plan handoff on iOS
and Android using a separately approved test account. Real PKCE links must open
on the registration device; used/expired links may require signing in manually.
