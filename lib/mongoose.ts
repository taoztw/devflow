import mongoose, { Mongoose } from "mongoose";

import "@/db";
import logger from "./logger";

const MONGODB_URL = process.env.MONGODB_URI as string;

if (!MONGODB_URL) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

const cached = global.mongoose;

if (!cached) {
  global.mongoose = { conn: null, promise: null };
}

const dbConnect = async (): Promise<Mongoose> => {
  if (cached.conn) {
    logger.info("Using existing MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URL)
      .then((mongoose) => {
        logger.info("New MongoDB connection");
        return mongoose;
      })
      .catch((err) => {
        logger.error("Error connecting to MongoDB", err);
        return err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default dbConnect;
