const authRouter = require("./auth.route");
const noteRouter = require("./note.route");
const othersRouter = require("./others.route");

module.exports = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/notes", noteRouter);
  app.use("/api", othersRouter);
};
