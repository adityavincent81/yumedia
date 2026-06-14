const authMiddleware = (req, res, next) => {
  console.log("========== AUTH MIDDLEWARE ==========");
  console.log("Cookies:", req.cookies);
  console.log("Access Token:", req.cookies?.accessToken);

  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      console.log("NO ACCESS TOKEN");

      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET
    );

    console.log("JWT VERIFIED", decoded);

    req.user = {
      userId: decoded.userId,
    };

    next();
  } catch (err) {
    console.log("JWT ERROR", err.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};