const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokenSecret = process.env.TOKEN_SECRET;
async function signToken(input, options) {
  return jwt.sign(input, tokenSecret, options);
}
async function decodeToken(token, next) {
  try {
    const decoded = jwt.decode(token, tokenSecret);
    return decoded;
  } catch (error) {
    console.log("Decode Token Error -", error.message);
    error.statusCode(401);
    next(error);
  }
}

module.exports = {
  signToken,
  decodeToken,
};
