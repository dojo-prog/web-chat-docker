import mongoose from "mongoose";
import ENV from "./env.js";

const connectDB = async () => {
  try {
    const MONGO_URI = ENV.MONGO_URI;

    if (!MONGO_URI) {
      throw new Error("No MongoURI provided");
    }
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.name}`);
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
};

export default connectDB;
