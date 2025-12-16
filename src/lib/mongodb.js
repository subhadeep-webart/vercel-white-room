import mongoose from "mongoose";

const MONGODB_URI = process.env.NEXT_PUBLIC_DBURL;
console.log("MONGODB_URI", MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error("⚠️ Please add your Mongo URI to .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    console.log("📡 Using existing MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        // family:0,
      })
      .then((mongoose) => {
        console.log("✅ MongoDB connected!");
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
