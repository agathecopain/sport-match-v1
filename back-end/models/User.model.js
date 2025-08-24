import mongoose from "mongoose";

const rolesEnum = ["admin", "user", "moderator"];
const gendersEnum = ["femme", "homme", "autre"];

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true, lowercase: true },
    lastName: { type: String, required: true, trim: true, lowercase: true },
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
    gender: { type: String, required: true, enum: gendersEnum },
    username: { type: String },
    avatar: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
  },
  { timestamps: true }
);

userSchema.index(
  { username: 1 },
  { unique: true, partialFilterExpression: { username: { $type: "string" } } }
);

export default mongoose.model("User", userSchema);
