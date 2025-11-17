import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";

const JWT_SECRET = process.env.JWT_SECRET;
const CLIENT_URL = process.env.CLIENT_URL;

class AuthController {
  async register(req, res) {
    try {
      const {
        firstName,
        lastName,
        gender,
        email,
        username,
        password,
        confirmPassword,
        role,
      } = req.body;
      const avatar = req.file?.path || "";

      if (
        !firstName ||
        !lastName ||
        !gender ||
        !email ||
        !username ||
        !password ||
        !confirmPassword
      ) {
        return res
          .status(400)
          .json({ message: "Tous les champs sont obligatoires." });
      }

      if (password !== confirmPassword) {
        return res
          .status(400)
          .json({ message: "Les mots de passe ne correspondent pas." });
      }

      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "Email déjà utilisé." });
      }

      const hashedpassword = await bcrypt.hash(password, 11);

      const newUser = new User({
        firstName,
        lastName,
        gender,
        email,
        username,
        password: hashedpassword,
        role: role || "user",
        avatar,
        isVerified: false,
      });

      await newUser.save();

      const verificationToken = jwt.sign({ id: newUser._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      const verificationUrl = `${CLIENT_URL}auth/verify/${verificationToken}`;

      const fullName = newUser.firstName.concat(" ", newUser.lastName);

      let emailAPI = new TransactionalEmailsApi();
      emailAPI.authentications.apiKey.apiKey = process.env.SMTP_API_KEY;

      let message = new SendSmtpEmail();
      message.subject = "Vérifiez votre compte";
      (message.htmlContent = `Bonjour ${newUser.firstName},<br><br>Merci de vérifier votre compte en cliquant sur ce lien : <a href="${verificationUrl}">Vérifier mon compte</a><br><br>Ce lien est valable 7 jours.`),
        (message.sender = {
          name: "Sport Match",
          email: process.env.GMAIL_USER,
        });
      message.to = [
        {
          email: newUser.email,
          name: fullName,
        },
      ];

      await emailAPI
        .sendTransacEmail(message)
        .then((resAPI) => {
          console.log(JSON.stringify(resAPI.body));
          return res.status(201).json({
            message: "Utilisateur créé. Un email de vérification a été envoyé.",
          });
        })
        .catch((err) => {
          console.error("Error sending email:", err.body);
        });
    } catch (error) {
      console.error("Register error : ", error);
      res
        .status(500)
        .json({ message: "Impossible d’enregistrer l'utilisateur." });
    }
  }
  async verifyEmail(req, res) {
    try {
      const { token } = req.params;
      const decoded = jwt.verify(token, JWT_SECRET);

      if (!decoded.id)
        return res.status(400).json({ message: "Token invalide." });

      const user = await User.findById(decoded.id);
      if (!user)
        return res.status(400).json({ message: "Utilisateur introuvable." });
      if (user.isVerified)
        return res.status(400).json({ message: "Compte déjà vérifié." });

      user.isVerified = true;

      await user.save();
      res.json({ message: "Compte vérifié avec succès." });
    } catch (error) {
      console.error("Verify email error : ", error);
      res.status(400).json({ message: "Token invalide ou expiré." });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).json({ message: "Les champs sont requis." });

      if (typeof email !== "string" || typeof password !== "string")
        return res
          .status(400)
          .json({ message: "Les champs ne sont pas valides." });

      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ message: "Utilisateur non trouvé." });
      if (!user.isVerified)
        return res
          .status(401)
          .json({ message: "Merci de vérifier votre email." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res
          .status(400)
          .json({ message: "Email ou mot de passe incorrect." });
      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
        },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
      });

      res.json({
        message: "Connexion réussie.",
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          gender: user.gender,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
        token,
      });
    } catch (error) {
      console.error("Login error : ", error);
      res.status(500).json({ message: "Erreur serveur." });
    }
  }

  async logout(req, res) {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });
      res.status(200).json({ message: "Déconnecté avec succès." });
    } catch (error) {
      console.error("Logout error : ", error);
      res.status(500).json({ message: "Erreur lors de la déconnexion" });
    }
  }

  async requestPasswordReset(req, res) {
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ message: "Email requis." });

      const user = await User.findOne({ email });
      if (!user)
        return res.status(404).json({ message: "Utilisateur non trouvé." });

      const resetToken = crypto.randomBytes(32).toString("hex");

      const resetTokenHashed = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

      user.resetPasswordToken = resetTokenHashed;

      user.resetPasswordExpire = Date.now() + 3600000; // 1h en ms

      await user.save();

      const resetUrl = `${CLIENT_URL}/auth/reset-password/${resetToken}`;

      await sendEmail({
        to: user.email,
        subject: "Réinitialisation du mot de passe",
        html: `<p>Bonjour ${user.firstName},</p>
               <p>Pour réinitialiser votre mot de passe, cliquez sur ce lien :</p>
               <a href="${resetUrl}">Changer le mot de passe</a>
               <p>Ce lien expire dans 1 heure.</p>`,
      });
      res.json({ message: "Email de réinitialisation envoyé." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur." });
    }
  }

  async resetPassword(req, res) {
    try {
      const { token } = req.params;
      const { password, confirmPassword } = req.body;

      if (!password || !confirmPassword)
        return res
          .status(400)
          .json({ message: "Tous les champs sont obligatoires." });

      if (password !== confirmPassword)
        return res
          .status(400)
          .json({ message: "Les mots de passe ne correspondent pas." });

      // Hash le token reçu pour le comparer en DB
      const resetTokenHashed = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

      // Trouver l'utilisateur avec token valide et non expiré
      const user = await User.findOne({
        resetPasswordToken: resetTokenHashed,
        resetPasswordExpire: { $gt: Date.now() },
      });

      if (!user)
        return res.status(400).json({ message: "Token invalide ou expiré." });

      // Hash du nouveau password
      user.password = await bcrypt.hash(password, 12);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      res.json({ message: "Mot de passe réinitialisé avec succès." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur." });
    }
  }

  async resendVerificationEmail(req, res) {
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ message: "Email requis." });

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "Utilisateur introuvable." });
      }

      if (user.isVerified) {
        return res.status(400).json({ message: "Ce compte est déjà vérifié." });
      }

      const verificationToken = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: "1d",
      });

      const verificationUrl = `${CLIENT_URL}/auth/verify/${verificationToken}`;

      await sendEmail({
        to: user.email,
        subject: "Nouveau lien de vérification",
        html: `Bonjour ${user.firstName},<br><br>Voici un nouveau lien pour vérifier votre compte : <a href="${verificationUrl}">Vérifier mon compte</a><br><br>Ce lien est valable 24h.`,
      });

      res.json({
        message: "Un nouveau lien de vérification a été envoyé à votre email.",
      });
    } catch (error) {
      console.error("Erreur lors du renvoi de l’email :", error);
      res
        .status(500)
        .json({ message: "Erreur lors de l’envoi du lien de vérification." });
    }
  }
}

export default new AuthController();
