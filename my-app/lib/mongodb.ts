// lib/mongodb.ts
import { MongoClient, Db, MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI || "";
const options: MongoClientOptions = {};

if (!uri) {
  throw new Error("Por favor agrega MONGODB_URI en .env.local");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function connectToDatabase(): Promise<{
  client: MongoClient;
  db: Db;
}> {
  try {
    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB || "rytux_db_user";
    const db = client.db(dbName);
    return { client, db };
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    throw error;
  }
}