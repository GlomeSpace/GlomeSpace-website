import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const emailSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: uuidv4(),
    },
    unsubscribed: {
      type: Boolean,
      default: false,
    },
    newsletter: {
      type: Boolean,
      default: false,
    },
    // investor specific
    username: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

const Email = mongoose.model("Email", emailSchema);

export { Email };
