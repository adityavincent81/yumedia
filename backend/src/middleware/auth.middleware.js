const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log("\n===== AUTH MIDDLEWARE =====");
  console.log("URL:", req.originalUrl);
  console.log("Headers Cookie:", req.headers.cookie);
  console.log("Parsed Cookies:", req.cookies);

  try {
    const token = req.cookies?.accessToken;
    console.log("Access Token Exists:", !!token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET
    );
    console.log("JWT VERIFIED");
console.log(decoded);

    req.user = {
      userId: decoded.userId,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;