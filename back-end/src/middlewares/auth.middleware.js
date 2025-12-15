import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Non authentifié, token manquant" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded.id)
      return res
        .status(401)
        .json({ message: "Utilisateur non trouvé ou supprimé" });
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalide ou expiré" });
  }
};

// Middleware pour vérifier le rôle utilisateur
export const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user)
      return res
        .status(401)
        .json({ message: "Accès refusé : non authentifié" });
    if (req.user.role !== role) {
      return res
        .status(403)
        .json({ message: "Accès interdit: rôle insuffisant" });
    }
    next();
  };
};

// Middleware pour vérifier plusieurs rôles
export const requireRoles = (roles) => {
  return (req, res, next) => {
    if (!roles) roles = [];
    if (!req.user)
      return res
        .status(401)
        .json({ message: "Accès refusé : non authentifié" });
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Accès interdit: rôle insuffisant" });
    }
    next();
  };
};
