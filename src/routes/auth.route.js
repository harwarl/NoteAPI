const { validator } = require("../middlewares/validator");
const { schemas } = require("../../utils/validator");
const { signup, logout, login } = require("../controllers/auth.controller");
const { isAuth } = require("../middlewares/isAuth");

const router = require("express").Router();

router.post("/signup", validator(schemas.signup), signup);

router.post("/login", validator(schemas.signin), login);

router.post("/logout", isAuth, logout);

module.exports = router;
