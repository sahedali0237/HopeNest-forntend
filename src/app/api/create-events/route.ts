import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received data:", body);

    const db = (await clientPromise).db("HopeNest");
    const collection = db.collection("data");

    const result = await collection.insertOne(body);

    return NextResponse.json(
      {
        message: "Data saved successfully!",
        insertedId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("MongoDB insert error:", error);

    return NextResponse.json(
      {
        message: "Failed to save data",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
