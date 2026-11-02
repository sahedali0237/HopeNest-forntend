import { NextResponse } from "next/server";
import type { Sort } from "mongodb";
import { getEventDocuments } from "@/app/events/events-db";

/**
 * Recognized `?sort=` values. Anything else — empty strings, the literal
 * `"undefined"`/`"null"`, `"All"`, or unknown values — is ignored so it can
 * never reach MongoDB's `.sort()` and turn into a 500.
 */
const SORT_OPTIONS: Record<string, Sort> = {
  latest: { eventDate: -1 },
  oldest: { eventDate: 1 },
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // Sanitize incoming query params: only an exact, recognized sort value is
    // applied. `category`, `search` and `location` are handled client-side by
    // EventsClient's filter → search → sort chain; unknown params are
    // deliberately ignored rather than treated as errors.
    const sort =
      SORT_OPTIONS[(searchParams.get("sort") ?? "").trim().toLowerCase()];

    // getEventDocuments() awaits the shared MongoDB connection before querying.
    const events = await getEventDocuments(sort);

    return NextResponse.json(events, { status: 200 });
  } catch (error: unknown) {
    // Print the full stack so any 500 shows its exact reason in the terminal.
    console.error(
      "GET /api/events failed:",
      error instanceof Error ? error.stack : error,
    );

    return NextResponse.json(
      {
        message: "Failed to fetch events",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
