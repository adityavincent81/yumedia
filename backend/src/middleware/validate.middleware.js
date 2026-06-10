const validate = (
  schema,
  source = "body"
) => {
  return (req, res, next) => {
    try {
      const result =
        schema.parse(req[source]);

      req[source] = result;

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = validate;