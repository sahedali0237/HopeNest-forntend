import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    const db = (await clientPromise).db("HopeNest");
    const collection = db.collection("data");

    const events = await collection.find({}).toArray();

    return NextResponse.json(events, { status: 200 });
  } catch (error: unknown) {
    console.error("MongoDB fetch error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch events",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}