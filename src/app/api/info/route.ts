import { NextResponse } from "next/server";

const API_INFO = {
  name: "HopeNest API",
  version: "1.0.0",
  description:
    "Community-driven event management platform for creating, joining, and tracking social service events.",
  baseUrl: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  endpoints: {
    auth: {
      "POST /api/auth/sign-up": "Register a new user account",
      "POST /api/auth/sign-in": "Sign in an existing user",
      "GET /api/auth/session": "Get the current user session",
      "POST /api/auth/sign-out": "Sign out the current user",
    },
    events: {
      "GET /api/events": "Fetch all events (public)",
      "GET /api/events/:id": "Fetch a single event by ID (public)",
      "POST /api/create-events": "Create a new event (protected, requires auth)",
      "DELETE /api/events/:id": "Delete an event (protected, owner only)",
      "PUT /api/events/:id": "Update an event (protected, owner only)",
      "POST /api/events/:id/join": "Join an event (protected, requires auth)",
    },
    info: {
      "GET /api/info": "Get API information and available endpoints",
    },
  },
  authentication: {
    type: "JWT (BetterAuth)",
    protectedRoutes: [
      "/create-events",
      "/manage-events",
      "/joined-events",
      "/profile",
    ],
  },
  database: "MongoDB (HopeNest)",
};

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      ...API_INFO,
    },
    { status: 200 },
  );
}
