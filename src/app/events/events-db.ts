import { ObjectId, type Document, type Sort } from "mongodb";
import { getDatabase } from "@/lib/mongodb";




const EVENTS_COLLECTION = "data";
const toJsonShape = <T>(value: T): T => JSON.parse(JSON.stringify(value));
export async function getEventDocuments(sort?: Sort): Promise<Document[]> {
  const db = await getDatabase();
  const cursor = db.collection(EVENTS_COLLECTION).find({});

  if (sort) {
    cursor.sort(sort);
  }

  return toJsonShape(await cursor.toArray());
}


export async function getEventDocument(id: string): Promise<Document | null> {
  if (!ObjectId.isValid(id)) return null;

  const db = await getDatabase();
  const doc = await db.collection(EVENTS_COLLECTION).findOne({ _id: new ObjectId(id) });

  return doc ? toJsonShape(doc) : null;
}
