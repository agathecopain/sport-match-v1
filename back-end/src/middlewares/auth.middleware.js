import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;

export const protect = (req, res, next) => {
  const token = req.cookies.token || "";

  if (!token) {
    return res.status(401).json({ message: "Non authentifié, token manquant" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // contient id et role
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
        .status(403)
        .json({ message: "Accès refusé : non authentifié" });
    if (req.user.role !== role) {
      return res
        .status(403)
        .json({ message: "Accès interdit: rôle insuffisant" });
    }
    next();
  };
};

// Middleware pour vérifier le rôle utilisateur
export const requireRoles = (roles) => {
  return (req, res, next) => {
    if (!roles) roles = [];
    if (!req.user)
      return res
        .status(403)
        .json({ message: "Accès refusé : non authentifié" });
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Accès interdit: rôle insuffisant" });
    }
    next();
  };
};
