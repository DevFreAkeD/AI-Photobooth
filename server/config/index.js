import dotenv from "dotenv";

// Load the variables into process.env
dotenv.config();

// Export the parsed variables or an empty object for direct access
export const config = process.env;