# HopeNest — Community-Driven Event Management Platform

HopeNest is a social development events platform where users can create, join, and track community service events in their local area — from winter clothes distribution to blanket drives, plantation drives, and cleanup campaigns.

## Live Site
🌐 **[https://hopenest.vercel.app](https://hopenest.vercel.app)**

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key Features

- **Create Events** — Logged-in users can create social service events with title, description, event type, location, date, and thumbnail image URL. Includes form validation and future-date enforcement.
- **Join Events** — Any logged-in user can join an upcoming event; participation records are saved in the database along with the user's details.
- **Manage Events** — Event creators can view, update, and delete only their own events. Ownership is enforced on the backend via JWT verification.
- **Upcoming Events** — Public listing of all upcoming events with filtering, search, and pagination. Past events are automatically excluded.
- **User Profile** — View and update your name, profile photo URL, and bio. Changes reflect immediately across the navbar and profile page.
- **Authentication** — Secure sign-in and sign-up with BetterAuth (email/password + Google & GitHub social providers). Password rules require at least one uppercase, one lowercase, and minimum 6 characters.
- **Protected Routes** — Create Event, Manage Events, Joined Events, and Profile pages require login; private API endpoints are protected by JWT verification middleware.

## Tech Stack

- **Framework:** Next.js (App Router)
- **UI:** Shadcn UI + Tailwind CSS v4
- **Authentication:** BetterAuth with MongoDB Adapter
- **Database:** MongoDB
- **Language:** TypeScript

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) — learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) — an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) — your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/building-your-application/deploying) for more details.
