import multer from "multer"; //gestion
import { CloudinaryStorage } from "multer-storage-cloudinary"; //stockage
import cloudinary from "../config/cloudinary.js"; //connexion db

// Filtrage des fichiers autorisés
function fileFilter(req, file, cb) {
  const allowedTypes = [
    "image/jpeg",
    "image/gif",
    "image/jpg",
    "image/webp",
    "image/avif",
    "image/png",
  ];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Type de fichier non autorisé"), false);
}

const avatarStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "sport-match/avatars",
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      return `avatar-${uniqueSuffix}`;
    },
    allowed_formats: ["jpeg", "gif", "jpg", "webp", "avif", "png"],
  },
});

export const uploadAvatar = multer({
  storage: avatarStorage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const sportIconStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "sport-match/sports",
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      return "icon-" + `${uniqueSuffix}`;
    },
    resource_type: "auto",
  },
});

export const uploadSportIcon = multer({
  storage: sportIconStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
