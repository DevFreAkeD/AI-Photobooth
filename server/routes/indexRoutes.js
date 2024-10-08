import { Router } from "express";
import { addUser, sendEmailToUser } from "../controllers/indexController.js";
import { imageUploadMiddleware } from "../middleware/multerMiddleware.js";

const router = Router();

// Define Routes
router.post("/user", [imageUploadMiddleware], addUser);
router.post("/email", sendEmailToUser);

export default router;