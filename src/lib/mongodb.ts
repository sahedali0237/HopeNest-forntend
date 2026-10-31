import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const dbName = "HopeNest";

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable in .env");
}

// Singleton pattern prevents creating a new MongoClient on every request,
// which is especially important during Next.js hot-reloads in development.
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;

/**
 * Get the "HopeNest" database instance.
 * Usage: const db = await getDatabase(); const collection = db.collection("data");
 */
export async function getDatabase() {
  const client = await clientPromise;
  return client.db(dbName);
}
