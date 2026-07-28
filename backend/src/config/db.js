import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);

    console.log("Database Connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};