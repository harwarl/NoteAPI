const { decodeToken } = require("../../utils/jwt");

async function isAuth(req, res, next) {
  try {
    const authorizationHeader = req.headers["authorization"];
    //check if header exists
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
      return res.status(401).json({
        status: false,
        message: "Authorization Header is not present",
      });
    }
    //get the token
    const token = authorizationHeader.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Authorization Token is not present",
      });
    }

    const decoded = await decodeToken(token);
    if (!decoded) {
      const error = new Error("Not Authorized - Invalid Token");
      error.statusCode = 401;
      throw error;
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Authentication Error -", error);
    error.statusCode = 401;
    next(error);
  }
}

module.exports = { isAuth };
