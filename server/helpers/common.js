import fs from "fs";
import APIError from "../exception/errorHandler.js";

//Delete File From Path Service
export const deleteFileFromPathService = async (path) => {
  try {
    // Delete File
    fs.unlink(path, () => {});

    // Resolve Promise
    return Promise.resolve();
  } catch (err) {
    throw new APIError(err.name, err.httpCode, err.isOperational, err.message);
  }
};