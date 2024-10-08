import APIError, { HttpStatusCode } from "../exception/errorHandler.js";
import { fileUploadService, uploadBase64ToS3 } from "./fileUploadService.js";
import User from "../db/models/userModel.js";
import { deleteFileFromPathService } from "../helpers/common.js";
import fs from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { sendEmailService } from "./sendEmailService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadDir = resolve(__dirname, "../uploads");

// Add User Service
export const addUserService = async (gender, type, image) => {
  try {
    console.log(uploadDir);

    if (!image || !image[0].path || !image.length) {
      throw new APIError(
        "Image Not Found",
        HttpStatusCode.BAD_REQUEST,
        true,
        "Image Not Found"
      );
    }

    const imageData1 = fs.readFileSync(image[0].path);
    const imageData2 = fs.readFileSync(
      `${uploadDir}/${gender === "male" ? "male" : "female"}_0${type}.png`
    );

    // Convert the binary data to base64
    const base64Image1 = imageData1.toString("base64");
    const base64Image2 = imageData2.toString("base64");

    // Prepare the payload for the API call
    const payload = {
      security: {
        token: '144e18982dmsh27332931b73fc9fp18e2c0jsnf15bd8659155', // Use your API key
        id: '144e18982dmsh27332931b73fc9fp18e2c0jsnf15bd8659155', // Use your API key
      },
      source: base64Image1,
      target: base64Image2,
    };
    // Send the request to the face swap API
    const response = await fetch("https://face-swap1.p.rapidapi.com/swap", {
      method: "POST",
      headers: {
        Authorization: "Bearer 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",
        "Content-Type": "application/json",
        "x-rapidapi-host": "face-swap1.p.rapidapi.com",
        "x-rapidapi-key": "144e18982dmsh27332931b73fc9fp18e2c0jsnf15bd8659155",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const result = await response.json();

    // Upload the original and AI-generated images to S3
    const originalImageS3Link = await fileUploadService(
      image[0].path,
      image[0].filename,
      true
    );

    const aiGeneratedImageS3Link = await uploadBase64ToS3(
      result.result,
      `${Date.now()}`,
      true
    );

    // Create new User entry in the database
    const user = new User({
      gender,
      type,
      orignalImage: originalImageS3Link.Location,
      genratedImage: aiGeneratedImageS3Link,
    });

    await user.save();

    // Delete the local file after processing
    await deleteFileFromPathService(image[0].path);

    return Promise.resolve(aiGeneratedImageS3Link);
  } catch (err) {
    throw new APIError(err.name, err.httpCode, err.isOperational, err.message);
  }
};

//#region Send Email to User Service
export const sendEmailToUserService = async (imageUrl, email) => {
  try {
    // Send an email with the image URL
    await sendEmailService(email, "Face Swap Image", "Face Swap Image", imageUrl);

    // Find the user associated with the generated image
    const user = await User.findOne({ genratedImage: imageUrl });

    console.log(user);

    if (!user) {
      throw new APIError(
        "User Not Found",
        HttpStatusCode.NOT_FOUND,
        true,
        "User Not Found"
      );
    }

    // Update the user's email and save it
    user.email = email;
    await user.save();

    // Resolve the promise
    return Promise.resolve();
  } catch (err) {
    throw new APIError(err.name, err.httpCode, err.isOperational, err.message);
  }
};