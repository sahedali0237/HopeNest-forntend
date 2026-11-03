# HopeNest

HopeNest is a social-development events platform that helps people
discover community initiatives, create events, and participate in
activities that make a positive difference.

## Live Website

[Visit HopeNest](https://hope-nest-forntend.vercel.app/)

## Repositories

- **Frontend:** [HopeNest
  Frontend](https://github.com/sahedali0237/HopeNest-forntend)
- **Backend:** [HopeNest
  Backend](https://github.com/sahedali0237/HopeNest-surver)

✨ Key Features

- 🗓️ Upcoming Events Discovery: Browse upcoming community events
  in a responsive grid. Past events are filtered out automatically.
- 🔐 Secure Authentication: Email/password and social login
  powered by Better Auth with a MongoDB adapter. Password validation
  requires at least one uppercase letter, one lowercase letter, and
  six or more characters.
- ➕ Create Events: Authenticated users can publish events with a
  title, description, event type, thumbnail, location, and future
  date. The creator's identity is associated with the event.
- 🤝 Join Events: Anyone can view public event details, while
  joining requires authentication. Participation is saved in the
  database.
- 🛠️ Manage Your Events: Event creators can update or delete their
  own events, with ownership checks enforced by the backend.
- 📅 Joined Events: View the events you have joined, organized by
  event date.
- 🛡️ JWT-Protected API: Private backend endpoints are protected by
  JWT verification using JWKS.
- 🌗 Light / Dark Mode: Switch between light and dark application
  themes.
- ✅ Form Validation: Login, registration, create-event, and
  update-event forms provide validation and clear toast feedback.
- 📱 Responsive Design: Optimized for mobile, tablet, and desktop
  screens.
- 🔄 Reload-Safe Routing: Application routes are designed to
  remain accessible after a browser refresh, including authenticated
  pages.

## Technology Stack

### Frontend

- Next.js
- React
- Tailwind CSS
- shadcn/ui
- Better Auth

### Backend

- Node.js
- Express.js
- MongoDB
- JWT verification with JWKS

## Project Structure

The frontend and backend are maintained in separate repositories:

```text
HopeNest/
├── frontend/   # Next.js application
└── backend/    # Express.js API
```

🗺️ Pages & Routes
Route Access Description
/ Public Hero banner, features,
recent events (up to
6), gallery, and
newsletter

/events Public Browse upcoming events

/events/:id Public View event details;
joining requires login

/login Public Email/password and
social login

/register Public Create an account

/create-event Private Create a new event

/manage-events Private Update or delete events
you created
/joined-events Private View events you have
joined
🔌 API Overview
The following table describes the intended API operations. Confirm the
endpoint names and HTTP methods against the deployed backend if you
change the server implementation.
Method Endpoint Auth Description
GET /events No Get upcoming
events

GET /events?limit=6 No Get up to six
events for the
homepage

GET /events/:id No Get a single
event

POST /events JWT Create an event

GET /my-events JWT Get events
created by the
logged-in user

PUT / PATCH /events/:id JWT Update an event
(owner only)

DELETE /events/:id JWT Delete an event
(owner only)

POST /join/:id JWT Join an event
GET /joined-events JWT Get events joined
by the logged-in
user

## Getting Started

### 1. Clone the repositories

```bash
git clone https://github.com/sahedali0237/HopeNest-forntend.git
git clone https://github.com/sahedali0237/HopeNest-surver.git
```

### 2. Set up the frontend

```bash
cd HopeNest-forntend
npm install
```

Create a `.env` file in the frontend project and add the
environment variables required by your frontend configuration. For
example:

```env
# Add the API base URL and Better Auth configuration
# using the variable names expected by your application.
```

Start the development server:

```bash
npm run dev
```

Open <http://localhost:3000> in your browser.

### 3. Set up the backend

Open a second terminal:

```bash
cd HopeNest-surver
npm install
```

Create a `.env` file in the backend project:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWKS_URI=your_better_auth_jwks_url
FRONTEND_URI=http://localhost:3000
```

Use the exact JWKS URL and environment variable values configured for
your Better Auth setup. Do not commit real secrets or database
credentials.

Start the backend using the script configured in its `package.json` (for
example, `npm start` or `npm run dev`).

## Main User Flow

1.  Visit HopeNest and explore available events.
2.  Sign in or create an account to access authenticated features.
3.  Create an event or open an existing event.
4.  Join events that interest you.
5.  Manage events you created and review events you joined.

## Security Notes

- Keep database credentials and authentication secrets in environment
  variables.
- Never commit `.env` or `.env.local` files.
- Protected API requests should include a valid authentication token.
- The backend should verify the token and enforce event ownership
  before allowing updates or deletion.

## Future Improvements

Potential improvements include richer event discovery and filtering,
enhanced user profiles, notifications, and additional accessibility
refinements.

## Author

**Sahed Ali**

---

HopeNest --- Connect with your community. Take part. Make a difference.
