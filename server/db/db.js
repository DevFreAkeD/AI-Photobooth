import mongoose from "mongoose";
import { config } from "../config/index.js";

const db = config.MONGO_URI;

const connectDB = async () => {
  try {
    // Check if MONGO_URI is defined
    if (!db) {
      throw new Error("MONGO_URI is not defined. Please check your environment variables.");
    }

    // Connect to MongoDB with connection options to avoid deprecation warnings
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database Connected Successfully");
  } catch (err) {
    console.error("Unable to connect to the Database:", err.message);
    // Exit program with failure
    process.exit(1);
  }
};

export default connectDB;