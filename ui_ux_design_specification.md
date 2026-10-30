# UI/UX Design Specification: HopeNest (Social Development Events Platform)

**Category:** B14-A8_Cat-Hermione  
**Design Theme:** Earth-Toned, Community-First, Trust & Action  
**Target Framework:** Next.js (App Router) + Tailwind CSS + Shadcn UI / Daisy UI / Hero UI

---

## 1. Brand Identity & Design Philosophy

- **Brand Name Concept:** **HopeNest** (_Community Action Platform_)
- **Visual Tone:** Warm, inspiring, trustworthy, and action-oriented. The interface pairs organic emerald greens (symbolizing growth, sustainability, and community service) with warm amber accents (representing urgency, human warmth, and local outreach).
- **Content Rule:** Every screen must use authentic, context-aware copy focused on local social development initiatives (e.g., _Mirpur 10 Winter Clothes Distribution_, _Dhanmondi Lake Cleanup_, _Mohammadpur Tree Plantation_). **No Lorem Ipsum text is permitted anywhere.**

---

## 2. Color Palette & Theme System (Light & Dark Mode)

To fulfill the mandatory **Theme Customization** challenge requirement, the application uses semantic color tokens that adapt smoothly between Light and Dark modes across the entire system.

### 2.1 Core Semantic Tokens

| Role                          | Light Mode Hex          | Dark Mode Hex           | Tailwind / Usage                               |
| :---------------------------- | :---------------------- | :---------------------- | :--------------------------------------------- |
| **Background (Primary)**      | `#F8FAFC` (Slate 50)    | `#0F172A` (Slate 900)   | Main page background                           |
| **Surface / Card**            | `#FFFFFF` (Pure White)  | `#1E293B` (Slate 800)   | Event cards, modals, forms, dropdowns          |
| **Surface (Elevated/Subtle)** | `#ECFDF5` (Emerald 50)  | `#064E3B` (Emerald 950) | Hero gradients, feature icon backgrounds       |
| **Text (Primary)**            | `#0F172A` (Slate 900)   | `#F8FAFC` (Slate 50)    | Main headings, card titles, primary copy       |
| **Text (Secondary/Muted)**    | `#475569` (Slate 600)   | `#94A3B8` (Slate 400)   | Descriptions, dates, location subtitles        |
| **Primary Brand (CTA)**       | `#059669` (Emerald 600) | `#10B981` (Emerald 500) | All primary buttons, active states, links      |
| **Primary Hover**             | `#047857` (Emerald 700) | `#059669` (Emerald 600) | Button hover states                            |
| **Secondary Accent**          | `#D97706` (Amber 600)   | `#F59E0B` (Amber 500)   | Highlights, callout badges, secondary tags     |
| **Border / Divider**          | `#E2E8F0` (Slate 200)   | `#334155` (Slate 700)   | Card borders, input outlines, section dividers |

### 2.2 Event Category Badge Tokens

- **Donation:** Background `#FEF3C7` / Text `#B45309` (Dark Mode: `#78350F` / `#FDE68A`)
- **Plantation:** Background `#D1FAE5` / Text `#047857` (Dark Mode: `#064E3B` / `#A7F3D0`)
- **Cleanup:** Background `#E0F2FE` / Text `#0369A1` (Dark Mode: `#0C4A6E` / `#BAE6FD`)
- **Status (Joined / Success):** `#10B981` (Emerald 500)
- **Destructive (Delete / Error):** `#EF4444` (Red 500)

---

## 3. Typography & Visual Consistency Rules

To satisfy the strict UI consistency guidelines:

- **Heading Font:** `Plus Jakarta Sans` or `Outfit` (SemiBold `600` & Bold `700`).
- **Body Font:** `Inter` or `Public Sans` (Regular `400` & Medium `500`).
- **Strict Consistency Rules:**
  1. **Navbar Logo & Brand Title:** Must use the exact same font family, weight, and primary emerald accent as the main Home page headings.
  2. **Section Headings (`h2`):** Uniformly styled across all pages (`text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-3`).
  3. **Section Subtitles:** Balanced spacing below every section heading (`text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-8`).
  4. **Button Uniformity:** Every primary action button (`View Event`, `Create Event`, `Join Event`, `Log In`) must share the exact same border-radius (`rounded-lg`), font weight (`font-semibold`), padding (`px-5 py-2.5`), and primary emerald fill.

---

## 4. Global Components & Layout Standards

### 4.1 Sticky Glassmorphism Navbar

- **Container:** Sticky top (`sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800`).
- **Left:** Brand Logo icon (hands holding a leaf/heart) + **HopeNest** wordmark.
- **Center:** Navigation links (`Home`, `Upcoming Events`). Active route features an emerald bottom indicator dot or bar.
- **Right (Controls & Conditional Auth):**
  - **Theme Toggle Button:** Pill or icon button switching smoothly between Light and Dark mode.
  - **Logged Out State:** Primary `Login` button redirecting to `/login`.
  - **Logged In State:**
    - **User Avatar:** Circular `40px x 40px` image with an emerald ring (`ring-2 ring-emerald-500`).
    - **Hover Tooltip:** Hovering over the avatar displays a floating tooltip with the user's `displayName`.
    - **Dropdown Menu (on click):**
      - `Create Event` (Protected Route)
      - `Manage Events` (Protected Route)
      - `Joined Events` (Protected Route)
    - **Logout Button:** Visible alongside or inside the auth control bar to sign out immediately with a confirmation toast.

### 4.2 Uniform Event Card Anatomy

All event grids must enforce **equal card height and width** (`flex flex-col h-full rounded-2xl border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all`):

1. **Thumbnail Container:** Fixed aspect ratio (`aspect-video` / $16:9$) with `object-cover` so images of different dimensions render identically.
2. **Category Pill Badge:** Positioned top-left or overlapping the bottom edge of the thumbnail (`Donation`, `Plantation`, `Cleanup`).
3. **Card Body (`flex-1 p-5 flex flex-col justify-between`):**
   - **Title:** `text-lg font-bold line-clamp-1`
   - **Meta Info:** Calendar icon + formatted Event Date (`Nov 12, 2026`) and Map Pin icon + Location (`Mirpur 10, Dhaka`).
   - **Action Footer:** Full-width `View Event` button pinned to the bottom (`mt-4 w-full`).

### 4.3 Eye-Catching Footer

- **Surface:** Deep slate (`#0F172A` in light mode, `#020617` in dark mode) with a subtle top wave or rounded top border.
- **Columns:**
  1. **Brand Column:** Logo, mission statement, and local Dhaka office contact info.
  2. **Quick Links:** Home, Upcoming Events, Create Event, Join Community.
  3. **Legal & Support:** Privacy Policy, Terms of Service, Volunteer Guidelines.
  4. **Social Links:** Must feature the **new X logo** (never the old Twitter bird), alongside Instagram, GitHub, and Facebook icons.

### 4.4 Feedback & Loading States

- **Notifications:** Use `sonner`, `react-hot-toast`, or `SweetAlert2` styled in emerald/red for all login, registration, event creation, update, and delete actions. **Never use default browser `alert()` or `confirm()`.**
- **Loading Skeletons (Optional Bonus Task #1):** Use pulsing shimmer placeholders (`animate-pulse bg-slate-200 dark:bg-slate-800`) matching the exact dimensions of the 3-column event cards while data fetches from MongoDB.

---

## 5. Page-by-Page Visual Specifications

### 5.1 Home Page (`/`) — Public

1. **Hero Banner Section:**
   - **Layout:** 2-column split on desktop (`lg:grid-cols-12 gap-8 items-center py-16`), stacked on mobile.
   - **Left (7 Cols):** Trust badge (_"Community-Driven Social Impact"_), bold headline (_"Empower Your Community, Create Lasting Change"_), readable subtitle, and dual CTA buttons (`Explore Events` primary button + `Create Event` secondary outline button).
   - **Right (5 Cols):** Framed photo collage of volunteers distributing winter clothes and planting trees, accented with floating impact cards (_"150+ Local Events"_, _"2,400+ Active Volunteers"_).
2. **Feature Section:**
   - **Layout:** 3 equal-height cards in a row (`grid-cols-1 md:grid-cols-3 gap-6`).
   - **Cards:** _Create Local Impact_ (organize drives easily), _Join Verified Events_ (discover nearby initiatives), and _Track Community Milestones_ (manage your volunteer journey).
3. **Recent Upcoming Events Section (Dynamic):**
   - **Header:** Section title + subtitle on the left, `View All Events ->` link on the right.
   - **Grid:** 3-column grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`) displaying 6 upcoming events fetched via MongoDB `.limit(6)` sorted by upcoming date.
4. **Community Gallery Section (Static):**
   - **Layout:** 4-column Bento or uniform photo grid (`grid-cols-2 md:grid-cols-4 gap-4`) showcasing real community service moments in Bangladesh with a smooth zoom-on-hover (`hover:scale-105 transition-transform duration-300`) and caption overlay.
5. **Newsletter Section (Static UI):**
   - **Layout:** Rounded horizontal banner with an amber-to-emerald gradient background, bold callout heading (_"Never Miss a Local Initiative"_), email input field, and `Subscribe` button.

### 5.2 Authentication Pages (`/login` & `/register`) — Public

- **Layout:** Centered card (`max-w-md mx-auto my-12 p-8 rounded-2xl shadow-lg border bg-card`) set against a soft radial gradient background.
- **Login Card (`/login`):**
  - Brand logo header + _"Welcome Back"_ title.
  - Validated `Email` and `Password` inputs.
  - Full-width primary `Log In` button.
  - Divider (`Or continue with`) followed by a `Continue with Google` (or GitHub) social OAuth button.
  - Footer link: _"New to HopeNest? Register here"_.
- **Register Card (`/register`):**
  - Inputs: `Full Name`, `Email Address`, `Photo URL`, and `Password` (with show/hide eye toggle).
  - **Live Password Checklist:** Real-time green checkmarks / red indicators below the password input verifying:
    - At least 6 characters
    - At least one uppercase letter (`A-Z`)
    - At least one lowercase letter (`a-z`)
  - _Note:_ No "Forgot Password" or email verification screens are included, ensuring frictionless evaluation.

### 5.3 Upcoming Events Page (`/upcoming-events`) — Public

- **Page Header:** Centered or left-aligned title (_"Upcoming Community Events"_) with subtitle.
- **Discovery & Filter Bar:** Search input on the left + horizontal category filter pills (`All`, `Cleanup`, `Plantation`, `Donation`) on the right.
- **Events Grid:** 3-column equal-height card grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`) displaying only future events (past dates filtered out on the server/query level).

### 5.4 Event Details Page (`/events/[id]`) — Public View, Protected Join Action

- **Breadcrumb:** `Home / Upcoming Events / [Event Title]`
- **Header:** Event Title, Category Badge, Location pin, and an `Organized by: [creatorEmail]` pill badge.
- **Layout:** 2-column asymmetric split (`lg:grid-cols-3 gap-8`):
  - **Left Column (2 Cols):** Large $16:9$ rounded event banner image, followed by the full **"About This Event"** description and volunteer checklist.
  - **Right Sticky Sidebar (1 Col):** Elevated summary card (`sticky top-24 p-6 rounded-2xl border bg-card shadow-sm`) displaying:
    - Event Date & Time block
    - Exact Location block + static map preview graphic
    - Avatar stack showing how many volunteers have joined
    - Full-width primary **`Join Event`** button (if not logged in, clicking prompts login; if logged in, saves participation to MongoDB and changes state to `"✓ Joined"`).

### 5.5 Create Event Page (`/create-event`) — Private Route

- **Layout:** Centered 2-column form card (`max-w-3xl mx-auto p-8 rounded-2xl border bg-card shadow-sm`).
- **Form Fields & UX:**
  - **Event Title:** Text input with required validation.
  - **Event Type:** Select dropdown (`Cleanup`, `Plantation`, `Donation`, `Awareness`, `Healthcare`).
  - **Thumbnail Image URL:** URL input with a small live image preview thumbnail on the right edge.
  - **Location:** Text input (e.g., _Mohammadpur, Dhaka_).
  - **Event Date:** Interactive Date Picker (e.g., `react-datepicker` or Shadcn Calendar) configured with `minDate={new Date()}` so **all past dates are visually disabled and unselectable**.
  - **Creator Email:** Read-only input with a lock icon pre-filled with the logged-in user's email.
  - **Description:** Multi-line textarea (`rows={4}`).
- **Submission:** Full-width `Create Event` button that triggers a success toast and redirects to `/upcoming-events`.

### 5.6 Manage Events Page (`/manage-events`) — Private Route

- **Header:** _"Manage My Events"_ with a badge showing total events created by the user.
- **Grid / Table View:** Displays only events where `creatorEmail === user.email`. Each card includes two action buttons at the bottom:
  - **`Update Event` (Emerald Outline/Solid):** Opens a clean **Update Event Modal** pre-populated with the event's current data and full form validation (including future-date validation).
  - **`Delete` (Crimson Outline):** Opens a **SweetAlert2 confirmation modal** (_"Are you sure you want to delete this event?"_) before deleting from MongoDB.

### 5.7 Joined Events & Profile Page (`/joined-events`) — Private Route

- **Layout:** 2-column dashboard split (`lg:grid-cols-12 gap-8`):
  - **Left Sidebar (4 Cols) — Profile View & Update (Optional Bonus Task #2):**
    - Displays the user's large circular avatar, Name, and Email.
    - Includes an inline form to update `Name` and `Photo URL` with an `Update Profile` button that immediately reflects changes in the Navbar.
  - **Right Main Area (8 Cols) — Joined Events List:**
    - Displays all events joined by the logged-in user, **sorted chronologically by Event Date** (nearest upcoming event first).
    - Each card includes a green **`✓ Joined`** badge on the top-right of the thumbnail.

---

## 6. Responsive Breakpoints & Mobile UX

| Viewport    | Breakpoint                            | Grid Columns                 | Layout Adaptations                                                                                                              |
| :---------- | :------------------------------------ | :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| **Mobile**  | $< 640\text{px}$ (`sm`)               | 1 Column (`grid-cols-1`)     | Navbar collapses into a hamburger drawer; Hero stacks vertically; Event Details sidebar moves below the description.            |
| **Tablet**  | $640\text{px} - 1024\text{px}$ (`md`) | 2 Columns (`md:grid-cols-2`) | Balanced 2-card rows; forms stack cleanly with comfortable touch targets ($44\text{px}$ min height).                            |
| **Desktop** | $> 1024\text{px}$ (`lg` / `xl`)       | 3 Columns (`lg:grid-cols-3`) | Full split-hero layout, sticky sidebars, and hover tooltips active within a `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` container. |
