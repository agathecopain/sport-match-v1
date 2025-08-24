import Joi from "joi";

export const usernameSchema = Joi.string().min(3).max(30).required().messages({
  "string.base": "Le pseudo doit être une chaîne de caractères.",
  "string.empty": "Le pseudo est requis",
  "string.min": "Le pseudo doit contenir au moins 3 caractères.",
  "string.max": "Le pseudo ne peut pas dépasser 30 caractères.",
  "any.required": "Le pseudo est requis.",
});

export const emailSchema = Joi.string().email().required().messages({
  "string.base": "L’adresse email doit être une chaîne de caractères.",
  "string.empty": "L’adresse email est requise.",
  "string.email": "L’adresse email n’est pas valide.",
  "any.required": "L’adresse email est requise.",
});

const passwordSchema = Joi.string()
  .pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
  )
  .required()
  .messages({
    "string.base": "Le mot de passe doit être une chaîne de caractères.",
    "string.empty": "Le mot de passe est requis.",
    "string.pattern.base":
      "Le mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.",
    "any.required": "Le mot de passe est requis.",
  });

//Schema inscription utilisateur
export const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Le prénom est requis.",
    "string.min": "Le prénom doit contenir au moins 2 caractères.",
  }),
  lastName: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Le nom est requis.",
    "string.min": "Le nom doit contenir au moins 2 caractères.",
  }),
  gender: Joi.string().required().messages({
    "string.empty": "le genre est requis.",
  }),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: Joi.valid(Joi.ref("password")).required().messages({
    "any.only": "Les mots de passe ne correspondent pas.",
  }),
});

//Schema connexion utilisateur
export const loginSchema = Joi.object({
  email: emailSchema,
  password: Joi.string().required(),
});

//Schema demande de changement de mot de passe
export const passwordResetRequestSchema = Joi.object({
  email: emailSchema
});

//Schema changement de mot de passe
export const resetPasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: passwordSchema,
  confirmPassword: Joi.valid(Joi.ref("newPassword")).required().messages({
    "any.only": "Les mots de passe ne correspondent pas.",
    "any.required": "La confirmation du mot de passe est requise.",
  }),
});
