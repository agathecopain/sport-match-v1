import mongoose from "mongoose";

const rolesEnum = ["admin", "user", "moderator"];

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    role: { type: String, enum: rolesEnum, default: "user" },
    gender: { type: String, required: true },
    username: { type: String },
    avatar: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
    //sports: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
