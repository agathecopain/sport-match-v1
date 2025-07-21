import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connexion à mongoDB réussie");
  } catch (err) {
    console.error("Erreur de connexion : ", err.message);
    process.exit();
  }
};
