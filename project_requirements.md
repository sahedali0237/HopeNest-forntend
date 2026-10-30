# Project Requirements: Social Development Events Platform
**Category:** B14-A8_Cat-Hermione

## 1. Project Overview
A community-driven event management platform where users can create, join, and track social service events in their local area (e.g., *Winter Clothes Distribution - Mirpur 10, Dhaka* or *Blanket Distribution for the Needy - Mohammadpur, Dhaka*).

---

## 2. Tech Stack & Architecture
### Frontend
- **Framework:** Next.js (App Router)
- **UI Library:** Hero UI / Daisy UI / Shadcn UI
- **Language:** TypeScript or JavaScript

### Backend
- **Framework:** Express.js
- **Database:** MongoDB
- **Language:** TypeScript (recommended if proficient) or JavaScript

### Authentication & Authorization
- **Auth Library:** BetterAuth with MongoDB Adapter
- **API Protection:** JWT (JSON Web Token)

---

## 3. General & Submission Rules
- **GitHub Commits:**
  - Client-side: Minimum **15 notable commits**.
  - Server-side: Minimum **8 notable commits**.
- **README.md:** Must be meaningful and include the website name, live site URL, and at least **5 bullet points** highlighting key features (on the client side).
- **Content & Alerts:**
  - **NO Lorem Ipsum** text allowed anywhere in the application.
  - **NO default browser `alert()`** for error or success messages (use Toasts or SweetAlert instead).
- **Deployment & Routing:**
  - Host on platforms like Vercel (Client) and Render (Server).
  - Reloading from **any route** must not throw an error.
  - Reloading a **private route** while logged in must **not** redirect the user to the Login page.

---

## 4. Layout & Page Structure
### 4.1 Navbar
- **App Logo / Name** (consistent style and size with the Home page).
- **Navigation Links:**
  - `Upcoming Events` (Public)
- **Conditional Auth Elements:**
  - **Not Logged In:** Show a `Login` button.
  - **Logged In:**
    - Show User's Profile Picture and a `Logout` button.
    - **Hover State:** Hovering over the profile picture must display the user's `displayName`.
    - **Profile Picture Dropdown Menu (Protected Routes):**
      - `Create Event`
      - `Manage Events`
      - `Joined Events`

### 4.2 Main Section
- Dynamically renders different pages based on the current route.

### 4.3 Footer
- Eye-catching design containing all relevant site and contact information.
- **Note:** Must use the **new X logo** instead of the old Twitter bird logo.

---

## 5. Authentication System
*Note: Do NOT implement email verification or forgot-password functionality so examiners can test easily.*

### 5.1 Login Page
- **Fields:** Email, Password.
- **Social Auth:** Google Login **OR** GitHub Login (implement at least one).
- **Navigation:** Link redirecting to the Register page.
- **Feedback:** Show a Toast/SweetAlert on successful login or error.

### 5.2 Register Page
- **Fields:** Name, Email, photoURL, Password.
- **Navigation:** Link redirecting to the Login page.
- **Password Validation Rules:**
  - At least 1 uppercase letter (`A-Z`).
  - At least 1 lowercase letter (`a-z`).
  - Minimum length of 6 characters.
- **Feedback:** Show an error message/toast if validation fails; show a success Toast/SweetAlert upon successful registration.

---

## 6. Page-by-Page Functional Requirements

### 6.1 Home Page (Public)
1. **Banner Section:** Custom design aligned with the social development and community-service theme.
2. **Feature Section:** Showcase key features of the platform.
3. **Recent Upcoming Events Section (Dynamic):**
   - Fetch from the database using MongoDB's `.limit(6)` operator sorted/filtered by date.
   - Display in a **2 or 3-column grid layout**.
4. **Gallery Section (Static):** Showcase photographs of various community service events.
5. **Newsletter Section (Static):** A well-designed newsletter subscription UI (no backend functionality required).

### 6.2 Create Event Page (Private Route)
- Accessible only to logged-in users.
- **Form Fields:**
  - `Title`
  - `Description`
  - `Event Type` (Dropdown: e.g., Cleanup, Plantation, Donation, etc.)
  - `Thumbnail Image URL`
  - `Location`
  - `Event Date` (**Validation:** Must be a future date; past dates cannot be selected/added).
  - `Creator Email` (Automatically attach the logged-in user's email for ownership validation).
- **Post-Submission:** Show a success toast/alert and automatically redirect the user to the **Upcoming Events** page.

### 6.3 Upcoming Events Page (Public Route)
- Display all user-created upcoming events in a grid layout.
- **Filtering Rule:** Only show upcoming events. Events whose dates have already passed **must not** appear on this page.
- **Event Card Content:** Thumbnail, Title, Location, Event Type, Event Date, and a `View Event` button (equal card height and width across the grid).

### 6.4 Event Details Page (Public Route with Protected Action)
- Navigated to by clicking the `View Event` button on an event card.
- **Visibility:** Public (anyone can view event details without logging in).
- **Join Event Functionality:**
  - Includes a functional `Join Event` button.
  - **Restriction:** User **must be logged in** to join an event.
  - **Database Action:** Clicking `Join Event` saves the participation record in the database along with the event data and the joining user's details.

### 6.5 Joined Events Page (Private Route)
- Displays all events that the currently logged-in user has joined.
- **Sorting Rule:** Events must be displayed **sorted by Event Date**.

### 6.6 Manage Events Page (Private Route)
- Displays all events created specifically by the logged-in user.
- **Actions:**
  - **Update Event:** Modify any data for their own created events.
  - **Delete Event:** Remove their own created events from the database.
- **Security Rule:** Users can only update or delete events they created themselves.

---

## 7. Challenge Requirements (Mandatory)
1. **Form Validation:**
   - Implement proper validation on the **Create Event** and **Update Event** forms.
   - Implement validation across all **Authentication** forms.
2. **Theme Customization:**
   - Add a **Light / Dark Mode toggle button** that switches the theme across the entire system based on user interaction.
3. **JWT Validation:**
   - Implement JWT verification middleware on the backend to protect private API endpoints.

---

## 8. UI/UX & Design Guidelines
- **Originality:** Must be a unique design (do not copy previous module projects or conceptual session examples).
- **Typography:** Keep main heading styles (font, size, color) consistent across all sections; maintain balanced paragraph spacing for readability.
- **Cards & Grids:** Maintain uniform image sizes, equal card heights/widths, and consistent padding/spacing.
- **Buttons:** Use a consistent button style matching the Home page across the entire app.
- **Social Icons:** Use the updated **X logo** instead of the old Twitter bird icon.
- **Responsiveness:** Fully responsive across Mobile, Tablet, and Desktop views.

---

## 9. Optional Tasks (Highly Recommended — Pick Any 2)
- [ ] **Loading Skeletons:** Add proper loading skeletons wherever data is being fetched across the application.
- [ ] **Profile Management:** Implement a Profile View and Update Profile feature allowing users to update their name and profile picture.
- [ ] **Custom Feature:** Add one unique extra feature of your own to differentiate your project.

---

## 10. Final Submission Checklist
- [ ] **Live Site Link** (Verified no reload errors on private/nested routes)
- [ ] **GitHub Repository (Client)** (15+ commits & complete `README.md`)
- [ ] **GitHub Repository (Server)** (8+ commits & JWT protection active)