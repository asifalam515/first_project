import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true },

    password: { type: String, required: true },
    needsPassword: { type: Boolean, default: true },
    role: {
      type: String,
      enum: ["student", "faculty", "admin"],
      default: "student",
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User = model<TUser>("User", userSchema);
