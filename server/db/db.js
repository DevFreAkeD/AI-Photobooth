import mongoose from "mongoose";
import { config } from "../config/index.js";

const db = config.MONGO_URI;

const connectDB = async () => {
  try {
    // Connect To MongoDB
    await mongoose.connect(db);
    console.log("Database Connected");
  } catch (err) {
    console.log("Unable to connect to the Database.", err.message);
    // Exit Program With Failure
    process.exit(1);
  }
};

export default connectDB;
