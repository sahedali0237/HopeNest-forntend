import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { auth } from "@/lib/auth";

// Helper to verify JWT token
async function verifyAuth(req: Request) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });
  return session?.user;
}

export async function GET(req: Request) {
  try {
    // Verify authentication
    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized - Please log in to view joined events" },
        { status: 401 },
      );
    }

    const db = (await clientPromise).db("HopeNest");
    const joinsCollection = db.collection("eventJoins");
    const eventsCollection = db.collection("data");

    // Find all join records for the current user, sorted by join date
    const joins = await joinsCollection
      .find({ userEmail: user.email })
      .sort({ joinedAt: -1 })
      .toArray();

    if (joins.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    // Fetch the full event documents for the joined event IDs
    const eventIds = joins
      .map((join) => join.eventId)
      .filter(Boolean)
      .map((id) => new ObjectId(id));

    const events = await eventsCollection
      .find({ _id: { $in: eventIds } })
      .toArray();

    // Build a lookup of event data by id, then merge with join info
    const eventMap = new Map(
      events.map((event) => [String(event._id), event]),
    );

    const joinedEvents = joins
      .map((join) => {
        const event = eventMap.get(join.eventId);
        if (!event) return null;
        return {
          _id: String(event._id),
          title: event.title,
          eventType: event.eventType,
          eventDate: event.eventDate,
          location: event.location,
          thumbnailUrl: event.thumbnailUrl,
          creatorEmail: event.creatorEmail,
          joinedAt: join.joinedAt,
          isJoined: true,
        };
      })
      .filter(
        (event): event is NonNullable<typeof event> => event !== null,
      )
      .sort(
        (a, b) =>
          new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime(),
      );

    return NextResponse.json(joinedEvents, { status: 200 });
  } catch (error: unknown) {
    console.error("Fetch joined events error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch joined events",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
