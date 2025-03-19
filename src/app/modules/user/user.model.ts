import { Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>({
  id: { type: String, required: true },
  status: { type: String },
  password: { type: String, required: true },
  needsPassword: { type: Boolean, default: true },
  role: {
    type: String,
    enum: ["admin", "student", "faculty"],
    default: "student",
  },
});
