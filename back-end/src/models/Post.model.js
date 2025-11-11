import mongoose from "mongoose";

const typesEnum = ["annonce", "event"];
const levelEnum = ["débutant", "loisir", "intermédiaire", "avancé"];
const gendersEnum = ["femme", "homme", "mixte"];

const postSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, enum: typesEnum },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true, trim: true, lowercase: true },
    sport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sport",
      required: true,
    },
    level: { type: String, enum: levelEnum },
    gender: { type: String, required: true, enum: gendersEnum },
    dateStart: { type: Date },
    dateEnd: { type: Date },
    body: { type: String },
    location: {
      address: { type: String },
      city: { type: String, required: true },
      postCode: { type: String, required: true },
    },
    isActive: { type: Boolean },
    favs: { type: Number },
    visibleByAll: { type: Boolean },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
