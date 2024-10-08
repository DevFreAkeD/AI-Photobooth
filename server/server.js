// Package Import
import express from "express";
import cors from "cors";
import { returnError } from "./exception/errorHandler.js";
import fs from "fs";
import { config } from "./config/index.js";
import connectDB from "./db/db.js";
// Middleware Imports
import { postTrimmer } from "./middleware/trimmer.js";
// Importing Routes
import indexRoute from "./routes/indexRoutes.js";

// Check if uploads directory exists, create if it doesn't
const uploadPath = process.cwd() + "/uploads";
if (!fs.existsSync(uploadPath)) {
  try {
    fs.mkdirSync(uploadPath);
  } catch (err) {
    console.error("Error creating uploads directory", err);
  }
}

// Start Server
const app = express();

// Connect Database
connectDB();

// Adding CORS Middleware
app.use(cors());

// Parsing Body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Trimming Post Requests
app.use(postTrimmer);

// Define Routes
app.use("/api", indexRoute);
app.get("/", (req, res) => {
  res.send("API Running");
});

// Handling Invalid URL
app.use((req, res, next) => {
  res.status(404).json({ errors: [{ msg: "Invalid Url" }] });
});

// Error Handler
app.use(returnError);

// Webserver Port
const PORT = config.SERVER_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Started on Port: ${PORT}`);
  console.log("MongoDB URI:", config.MONGO_URI);  // Log MongoDB URI for debugging
});