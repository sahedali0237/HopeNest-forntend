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

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = (await clientPromise).db("HopeNest");
    const joinsCollection = db.collection("eventJoins");

    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json(
        { joined: false, joinCount: 0 },
        { status: 200 },
      );
    }

    const [joinCount, userJoin] = await Promise.all([
      joinsCollection.countDocuments({ eventId: id }),
      joinsCollection.findOne({
        eventId: id,
        userEmail: user.email,
      }),
    ]);

    return NextResponse.json(
      {
        joined: !!userJoin,
        joinCount,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Join status error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch join status",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify authentication - user must be logged in to join
    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized - Please log in to join events" },
        { status: 401 },
      );
    }

    const { id } = await params;
    const db = (await clientPromise).db("HopeNest");
    const eventsCollection = db.collection("data");
    const joinsCollection = db.collection("eventJoins");

    // Check if event exists
    const event = await eventsCollection.findOne({
      _id: new ObjectId(id),
    });
    if (!event) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 },
      );
    }

    // Check if user already joined this event
    const alreadyJoined = await joinsCollection.findOne({
      eventId: id,
      userEmail: user.email,
    });
    if (alreadyJoined) {
      return NextResponse.json(
        { message: "You have already joined this event" },
        { status: 400 },
      );
    }

    // Save the participation record
    await joinsCollection.insertOne({
      eventId: id,
      eventTitle: event.title,
      userEmail: user.email,
      userName: user.name,
      userImage: user.image,
      joinedAt: new Date(),
    });

    const joinCount = await joinsCollection.countDocuments({ eventId: id });

    return NextResponse.json(
      {
        message: "Successfully joined the event",
        eventId: id,
        joined: true,
        joinCount,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("Event join error:", error);

    return NextResponse.json(
      {
        message: "Failed to join event",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify authentication - user must be logged in to leave an event
    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized - Please log in to leave events" },
        { status: 401 },
      );
    }

    const { id } = await params;
    const db = (await clientPromise).db("HopeNest");
    const joinsCollection = db.collection("eventJoins");

    // Check if user has joined this event
    const userJoin = await joinsCollection.findOne({
      eventId: id,
      userEmail: user.email,
    });

    if (!userJoin) {
      return NextResponse.json(
        { message: "You have not joined this event" },
        { status: 400 },
      );
    }

    // Remove the participation record
    await joinsCollection.deleteOne({
      eventId: id,
      userEmail: user.email,
    });

    const joinCount = await joinsCollection.countDocuments({ eventId: id });

    return NextResponse.json(
      {
        message: "Successfully left the event",
        eventId: id,
        joined: false,
        joinCount,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Leave event error:", error);

    return NextResponse.json(
      {
        message: "Failed to leave event",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
