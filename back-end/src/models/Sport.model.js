import mongoose from "mongoose";

const sportSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    iconeUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Sport", sportSchema);
