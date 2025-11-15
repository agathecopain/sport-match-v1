import Joi from "joi";

//Schema création catégorie (sport)
export const sportSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Le nom est requis.",
    "string.min": "Le nom doit contenir au moins 2 caractères.",
  }),
});

//Schema update catégorie (sport)
export const sportUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(50).messages({
    "string.min": "Le nom doit contenir au moins 2 caractères.",
  }),
});
