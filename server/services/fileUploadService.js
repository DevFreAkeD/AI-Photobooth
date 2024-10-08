import { config } from "../config/index.js";
import AWS from "aws-sdk";
import fs from "fs";
import { fileTypeFromBuffer } from "file-type";
import APIError from "../exception/errorHandler.js";

// AWS Configurations
AWS.config.update({
  accessKeyId: config.AWS_ACCESS_KEY,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  region: config.AWS_REGION,
});

//File Upload Service
export const fileUploadService = async (filePath, nameOfFile, downloadable) => {
  try {
    // Defining Variables
    const s3 = new AWS.S3();
    const path = filePath;
    const buffer = fs.readFileSync(path);
    const type = await fileTypeFromBuffer(buffer);
    const fileName = nameOfFile;

    // Define Params
    const params = {
      Body: buffer,
      Bucket: config.AWS_BUCKET_NAME,
      ContentType: type.mime,
      Key: `${config.AWS_BUCKET_FOLDER}/${fileName}.${type.ext}`,
    };

    // Uploading Downloadable Files
    if (downloadable === true) {
      params.ContentDisposition = "attachment";
    }

    // Get Result
    let result = await s3.upload(params).promise();

    // Resolve Promise
    return result;
  } catch (err) {
    throw new APIError(err.name, err.httpCode, err.isOperational, err.message);
  }
};

//=File Upload Service (Base64 to S3)
export const uploadBase64ToS3 = async (base64String, nameOfFile, downloadable) => {
  try {
    // Initialize S3
    const s3 = new AWS.S3();

    // Convert Base64 String to Buffer
    const buffer = Buffer.from(base64String, "base64");

    // Detect the file type from the buffer
    const type = await fileTypeFromBuffer(buffer);

    // Define S3 upload parameters
    const params = {
      Body: buffer,
      Bucket: config.AWS_BUCKET_NAME,
      ContentType: type.mime,
      Key: `${config.AWS_BUCKET_FOLDER}/${nameOfFile}.${type.ext}`,
    };

    // Set ContentDisposition to "attachment" if downloadable
    if (downloadable) {
      params.ContentDisposition = "attachment";
    }

    // Upload to S3 and get the result
    const result = await s3.upload(params).promise();

    // Return the file's URL
    return result.Location;
  } catch (err) {
    throw new APIError(err.name, err.httpCode, err.isOperational, err.message);
  }
};