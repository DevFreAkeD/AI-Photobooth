import multer from "multer";
import { v4 as uuidv4 } from "uuid";

//Upload Image Middleware

// Disk Storage Properties
const storage = multer.diskStorage({
  // Changing Destination
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },

  filename: (req, file, cb) => {
    // Generate UUID
    const uniqueId = uuidv4();

    // Original File Name
    const { originalname } = file;

    // Assigning New Name To File
    cb(null, `${uniqueId}${originalname}`);
  },
});

// Upload Middleware
const uploadFileMiddleware = multer({ storage });

//Profile Image Upload File
export const imageUploadMiddleware = uploadFileMiddleware.fields([
  { name: "image", maxCount: 1 },
]);