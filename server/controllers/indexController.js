import { addUserService, sendEmailToUserService } from "../services/indexService.js";

// Add User Controller
export const addUser = async (req, res, next) => {
  try {
    const { gender, type } = req.body;
    const { image } = req.files;

    const result = await addUserService(gender, type, image);
    // Send Response
    res.status(201).json({ result });
  } catch (err) {
    next(err);
  }
};

// Send Email to User Controller
export const sendEmailToUser = async (req, res, next) => {
  try {
    // Destructure Request
    const { email, imageUrl } = req.body;

    await sendEmailToUserService(imageUrl, email);

    // Send Response
    res.json({ result: "Success" });
  } catch (err) {
    next(err);
  }
};