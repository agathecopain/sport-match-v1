import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  //password: { type: String, required: true, minLength: 8 },
  role: { type: String, default: "user" },
  gender: { type: String, required: true },
  pseudo: { type: String },
  sports: { type: String },
});

export default mongoose.model("User", userSchema);
