import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { auth } from "@/lib/auth";

// Helper to verify JWT token
async function verifyAuth(req: Request) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });
  return session?.user;
}

export async function POST(req: Request) {
  try {
    // Verify authentication
    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized - Please log in to create events" },
        { status: 401 }
      );
    }

    const body = await req.json();
    console.log("Received data:", body);

    const db = (await clientPromise).db("HopeNest");
    const collection = db.collection("data");

    // Add creator info and timestamps
    const eventData = {
      ...body,
      creatorEmail: user.email,
      creatorName: user.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(eventData);

    return NextResponse.json(
      {
        message: "Event created successfully!",
        insertedId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("MongoDB insert error:", error);

    return NextResponse.json(
      {
        message: "Failed to create event",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
