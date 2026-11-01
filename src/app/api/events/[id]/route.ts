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
    const collection = db.collection("data");

    const event = await collection.findOne({ _id: new ObjectId(id) });

    if (!event) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(event, { status: 200 });
  } catch (error: unknown) {
    console.error("MongoDB fetch error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch event",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify authentication
    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const db = (await clientPromise).db("HopeNest");
    const collection = db.collection("data");

    // Check if event exists and belongs to the user
    const event = await collection.findOne({ _id: new ObjectId(id) });
    if (!event) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    // Verify ownership
    if (event.creatorEmail?.toLowerCase() !== user.email?.toLowerCase()) {
      return NextResponse.json(
        { message: "You can only delete your own events" },
        { status: 403 }
      );
    }

    await collection.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json(
      { message: "Event deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("MongoDB delete error:", error);

    return NextResponse.json(
      {
        message: "Failed to delete event",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify authentication
    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await req.json();
    const db = (await clientPromise).db("HopeNest");
    const collection = db.collection("data");

    // Check if event exists and belongs to the user
    const event = await collection.findOne({ _id: new ObjectId(id) });
    if (!event) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    // Verify ownership
    if (event.creatorEmail?.toLowerCase() !== user.email?.toLowerCase()) {
      return NextResponse.json(
        { message: "You can only update your own events" },
        { status: 403 }
      );
    }

    // Remove fields that shouldn't be updated
    const { _id, creatorEmail, createdAt, ...updateData } = body;

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updatedAt: new Date() } },
      { returnDocument: "after" }
    );

    return NextResponse.json(
      {
        message: "Event updated successfully",
        event: result,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("MongoDB update error:", error);

    return NextResponse.json(
      {
        message: "Failed to update event",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}