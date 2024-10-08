import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    default: "",
  },

  type: {
    type: String,
    required: true,
  },

  orignalImage: {
    type: String,
    required: true,
  },

  genratedImage: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
export default User;