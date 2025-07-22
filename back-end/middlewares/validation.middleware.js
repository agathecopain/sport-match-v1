export const validate =
  (schema, location = "body") =>
  (req, res, next) => {
    if (!schema) return next();
    const { error, value } = schema.validate(req[location]);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    req[location] = value;
    next();
  };
