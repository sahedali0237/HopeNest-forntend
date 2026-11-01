# AGENTS.md: HopeNest Event Management Platform

This file contains repo-specific guidance for OpenCode agents. Every line below answers "Would an agent likely miss this without help?" — if not, it was left out.

## Commands

| Action | Command |
|--------|---------|
| Start dev server | `npm run dev` |
| Build for production | `npm run build` |
| Start production server | `npm run start` |
| Lint code | `npm run lint` |
| Type-check | `npx tsc --noEmit` (implied by `next build`) |

**Important**: Always run `lint -> typecheck -> test` in that order before committing. The `next build` command performs type-checking as part of the build.

## Project Structure

- **`src/app/`** — Next.js App Router pages and API routes
  - `page.tsx` — Home page (fetches events from API)
  - `events/[id]/` — Event details page
  - `create-events/` — Private route: create new event (uses DashboardLayout + EventForm)
  - `manage-events/` — Private route: view and manage user-created events
  - `joined-events/` — Private route: view events user has joined
  - `profile/` — Private route: user profile view and editing
  - `events/page.tsx` — Upcoming events listing with filters
  - `api/create-events/route.ts` — POST endpoint for creating events
  - `api/auth\[...all\]/route.ts` — BetterAuth endpoints
- **`src/components/ui/`** — Shadcn/UI primitives and dashboard-specific components
  - `navbar.tsx` — Sticky glassmorphism navbar with auth controls
  - `footer.tsx` — Multi-column footer with social links
  - `hero.tsx`, `upcoming-events.tsx`, `community-gallery.tsx`, etc.
  - **Dashboard components:**
    - `dashboard-layout.tsx` — Main layout with fixed 250px sidebar (desktop) / sliding drawer (mobile)
    - `dashboard-sidebar.tsx` — Navigation sidebar with Create Event, Manage Events, Joined Events, Profile
    - `dashboard-header.tsx` — Top bar showing HopeNest brand and user profile menu
    - `event-card.tsx` — Reusable event card with type badge, title, date, location, actions
    - `event-form.tsx` — Form for creating events with validation and date picker
    - `confirm-dialog.tsx` — SweetAlert2-style confirmation dialog
    - `empty-state.tsx` — Styled empty state component for pages with no data
    - `loading-skeleton.tsx` — Pulsing skeleton placeholder for loading states
    - `select.tsx` — Styled select dropdown component
- **`src/lib/`** — Utility modules
  - `auth.ts` — better-auth with MongoDB adapter
  - `auth-client.ts` — better-auth React client
  - `mongodb.ts` — MongoDB singleton (dev: global cache, prod: new client)
  - `utils.ts` — general helpers (cn utility, formatDate)
- **`src/lib/events-data.ts`** — Event data shape + normalizeEvent; `API_URL` points to `http://localhost:5000/events`

## Key Conventions & Patterns

- **Server Components by default** — Pages in `src/app/` are server components unless `"use client"` is at the top. Client components live in `src/components/ui/`.
- **`fetch` with `cache: "no-store"`** — All data-fetching in this repo uses `cache: "no-store"` to prevent stale SSG generation (see `page.tsx`, `events/page.tsx`).
- **`normalizeEvent()`** — Always normalize events from the API using the function in `src/lib/events-data.ts` to strip whitespace from fields.
- **Filter → search → sort chain** in `EventsClient` (`src/app/events/events-client.tsx`):
  1. Apply filter chip
  2. Apply search input
  3. Sort by latest/oldest
- **Pagination** — `EVENTS_PER_PAGE = 6`; visible events are sliced per page; page numbers show ellipsis when > 5 pages.
- **Type badges by event type** — Cleanup/Donation/Plantation have dedicated emerald/orange/lime styles; "Other" uses rose. See `TYPE_STYLES` in `events-client.tsx`.
- **Event card anatomy** — Fixed height (`h-44` thumbnail + `p-4` body), type badge positioned top-left, "View Event" button at bottom.
- **No `alert()` or `confirm()`** — Use `react-toastify` (`toast.success()`, `toast.error()`) or SweetAlert2 for all user feedback.
- **Tailwind v4** — Configured in `next.config.ts` with `@tailwindcss/turbopack` for dev and `tailwindcss` for build. `globals.css` imports: `@tailwindcss`, `tw-animate-css`, `shadcn/tailwind.css`.
- **Color palette** (from UI/UX spec — emerald/amber/slate tones). Use the specified semantic tokens; do not deviate.

## Authentication

- **better-auth** with MongoDB adapter (see `src/lib/auth.ts`, `src/lib/auth-client.ts`).
- **Challenge requirement**: JWT verification middleware must be implemented on the backend to protect private API endpoints.
- **Private routes**: `/create-events`, `/manage-events`, `/joined-events` require login.
- **Navbar auth state**: Shows "Login"/"Sign Up" when not logged in; shows user avatar + dropdown (`Create Event`, `Manage Events`, `Joined Events`, `Logout`) when logged in.
- **Password validation** (register): min 6 chars, at least one uppercase (`A-Z`), at least one lowercase (`a-z`).
- **No email verification or forgot-password** functionality — keep frictionless for examiners.

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/events` | Fetch all events (public) |
| `POST` | `/api/create-events` | Create event (protected — requires auth) |
| `GET` | `/api/auth\[...all\]` | betterAuth endpoints (sign in, sign up, session, etc.) |

The API expects JSON bodies matching the `EventData` shape from `src/lib/events-data.ts`.

## Common Gotchas

- **Theme toggle is NOT implemented** — per project instructions, do not add theme change or text background change functionality. The design spec defines light/dark tokens but the toggle is an optional/mandatory challenge requirement that may or may not be in scope depending on the evaluation criteria. Follow the user's instruction: **do not add theme change functionality**.
- **MongoDB URI** — Must set `MONGODB_URI` in `.env`; the app throws if missing (see `src/lib/mongodb.ts`).
- **`next dev` uses Turbopack** — CSS is handled via `@tailwindcss/turbopack` rule in `next.config.ts`. Do not try to use `next dev --turbopack` flag unless you understand the implications.
- **`next build` performs type-checking** — If type errors exist, the build will fail. Fix type errors before proceeding to lint/test.
- **`npm run lint` uses ESLint v9** — Config in `eslint.config.mjs`. May be stricter than you're used to; fix all errors.
- **Favicon** — `public/favicon.png` referenced in `layout.tsx`. Ensure it exists if you add route-specific icons.
- **`next/font` Geist** — Font is loaded automatically; do not swap fonts globally without updating `layout.tsx`.

## Optional but Highly Recommended

- **Loading skeletons** — Add `animate-pulse bg-slate-200 dark:bg-slate-800` placeholders matching event card dimensions wherever data is fetched (optional bonus task #1 from design spec).
- **Profile management** — Implement Name/Photo URL update with immediate navbar reflection (optional bonus task #2).
- **Custom feature** — Add one unique extra feature to differentiate the project.