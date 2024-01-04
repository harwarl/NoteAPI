function validator(schema, part = "body") {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[part]);
    if (error) {
      return res
        .status(400)
        .json({ status: false, message: error.details[0].message });
    }
    next();
  };
}

module.exports = {
  validator,
};
