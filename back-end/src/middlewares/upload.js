import multer from "multer"; //gestion
import { CloudinaryStorage } from "multer-storage-cloudinary"; //stockage
import cloudinary from "../config/cloudinary.js"; //connexion db

const avatarStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "sport-match/avatars",
    allowed_formats: ["jpeg", "gif", "jpg", "webp", "avif", "png"],
  },
});

export const uploadAvatar = multer({ storage: avatarStorage });

const sportIconStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "sport-match/sports",
    resource_type: "auto",
  },
});

export const uploadSportIcon = multer({ storage: sportIconStorage });
