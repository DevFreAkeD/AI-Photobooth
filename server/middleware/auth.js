import jwt from "jsonwebtoken";
import config from "config";

// Middleware for authentication
export const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    console.log(token);

    if (!token) {
      throw new Error();
    }

    const key = config.get("accessTokenSecret");
    const decoded = jwt.verify(token, key);

    req.token = {
      userId: decoded.userKey,
    };

    next();
  } catch (err) {
    res.status(401).send("Authentication failed");
  }
};