import Joi from "joi";

const typesEnum = ["annonce", "event"];
const levelEnum = ["débutant", "loisir", "intermédiaire", "avancé"];
const gendersEnum = ["femme", "homme", "mixte"];

export const createPostSchema = Joi.object({
  type: Joi.string()
    .valid(...typesEnum)
    .required()
    .messages({
      "any.required": "Le type de publication est requis.",
      "any.only": `Le type doit être parmi : ${typesEnum.join(", ")}.`,
    }),

  title: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Le titre est requis.",
    "string.min": "Le titre doit contenir au moins 2 caractères.",
    "string.max": "Le titre ne peut pas dépasser 100 caractères.",
  }),

  sport: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "L’identifiant du sport est invalide.",
      "any.required": "Le sport est requis.",
    }),

  level: Joi.string()
    .valid(...levelEnum)
    .messages({
      "any.only": `Le niveau doit être parmi : ${levelEnum.join(", ")}.`,
    }),

  gender: Joi.string()
    .valid(...gendersEnum)
    .required()
    .messages({
      "string.empty": "Le genre est requis.",
      "any.only": `Le genre doit être parmi : ${gendersEnum.join(", ")}.`,
    }),

  dateStart: Joi.date().required().messages({
    "date.base": "La date de début doit être une date valide.",
    "any.required": "La date de début est requise.",
  }),

  dateEnd: Joi.date().greater(Joi.ref("dateStart")).required().messages({
    "date.base": "La date de fin doit être une date valide.",
    "date.greater": "La date de fin doit être postérieure à la date de début.",
    "any.required": "La date de fin est requise.",
  }),

  body: Joi.string().min(10).required().messages({
    "string.empty": "La description est requise.",
    "string.min": "La description doit contenir au moins 10 caractères.",
  }),

  location: Joi.object({
    address: Joi.string().allow(null, "").messages({
      "string.base": "L’adresse doit être une chaîne de caractères.",
    }),
    city: Joi.string().required().messages({
      "string.empty": "La ville est requise.",
    }),
    postCode: Joi.string()
      .pattern(/^[0-9]{5}$/)
      .required()
      .messages({
        "string.empty": "Le code postal est requis.",
        "string.pattern.base": "Le code postal doit contenir 5 chiffres.",
      }),
  }).required(),

  isActive: Joi.boolean().default(false),
  favs: Joi.number().min(0).default(0),
  visibleByAll: Joi.boolean().default(false),
});

export const updatePostSchema = Joi.object({
  title: Joi.string().min(2).max(100).messages({
    "string.min": "Le titre doit contenir au moins 2 caractères.",
    "string.max": "Le titre ne peut pas dépasser 100 caractères.",
  }),
  sport: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.pattern.base": "L’identifiant du sport est invalide.",
    }),
  level: Joi.string()
    .valid(...levelEnum)
    .messages({
      "any.only": `Le niveau doit être parmi : ${levelEnum.join(", ")}.`,
    }),
  gender: Joi.string()
    .valid(...gendersEnum)
    .messages({
      "any.only": `Le genre doit être parmi : ${gendersEnum.join(", ")}.`,
    }),
  dateStart: Joi.date().messages({
    "date.base": "La date de début doit être une date valide.",
  }),
  dateEnd: Joi.date().greater(Joi.ref("dateStart")).messages({
    "date.base": "La date de fin doit être une date valide.",
    "date.greater": "La date de fin doit être postérieure à la date de début.",
  }),
  body: Joi.string().min(10).messages({
    "string.min": "La description doit contenir au moins 10 caractères.",
  }),
  location: Joi.object({
    address: Joi.string().allow(null, "").messages({
      "string.base": "L’adresse doit être une chaîne de caractères.",
    }),
    city: Joi.string().messages({
      "string.base": "La ville doit être une chaîne de caractères.",
    }),
    postCode: Joi.string()
      .pattern(/^[0-9]{5}$/)
      .messages({
        "string.pattern.base": "Le code postal doit contenir 5 chiffres.",
      }),
  }).messages({
    "object.base": "L’emplacement doit être un objet valide.",
  }),
  isActive: Joi.boolean(),
  favs: Joi.number().min(0).messages({
    "number.base": "Le nombre de favoris doit être un nombre.",
    "number.min": "Le nombre de favoris ne peut pas être négatif.",
  }),
  visibleByAll: Joi.boolean(),
})
  .min(1)
  .messages({
    "object.min": "Au moins un champ doit être fourni pour la mise à jour.",
  });
