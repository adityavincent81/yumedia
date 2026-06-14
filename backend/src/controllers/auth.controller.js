const authService = require("../services/auth/auth.service");

const {
  registerSchema,
  loginSchema,
} = require("../validators/auth.validator");

const asyncHandler = require("../utils/asyncHandler");

const {
  successResponse,
} = require("../utils/Response");

class AuthController {
  register = asyncHandler(async (req, res) => {
    const validatedData =
      registerSchema.parse(req.body);

    const result =
      await authService.register(validatedData);

      console.log("===== LOGIN SUCCESS =====");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("Cookies before set:", req.cookies);
    return successResponse(res, {
      statusCode: 201,
      message: "Register successful",
      data: {
        user: result.user,
      },
    });
  });

  login = asyncHandler(async (req, res) => {
    const validatedData =
      loginSchema.parse(req.body);

    const result =
      await authService.login(validatedData);

    res.cookie(
      "accessToken",
      result.accessToken,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      }
    );

    res.cookie(
      "refreshToken",
      result.refreshToken,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge:
          7 * 24 * 60 * 60 * 1000,
      }
      
    );

    return successResponse(res, {
      statusCode: 200,
      message: "Login successful",
      data: {
        user: result.user,
      },
    });
  });

  refresh = asyncHandler(async (req, res) => {
    const refreshToken =
      req.cookies?.refreshToken;
      console.log("\n===== REFRESH =====");
console.log("URL:", req.originalUrl);
console.log("Headers Cookie:", req.headers.cookie);
console.log("Parsed Cookies:", req.cookies);
console.log("Refresh Exists:", !!refreshToken);

    const result =
      await authService.refresh(
        refreshToken
      );

    res.cookie(
      "accessToken",
      result.accessToken,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      }
    );

    res.cookie(
      "refreshToken",
      result.refreshToken,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge:
          7 * 24 * 60 * 60 * 1000,
      }
    );
    console.log("Cookies after set (server cannot read newly set cookies):", req.cookies);
console.log("Access token generated:", !!result.accessToken);
console.log("Refresh token generated:", !!result.refreshToken);

    return successResponse(res, {
      statusCode: 200,
      message: "Token refreshed successfully",
    });
  });

  

  logout = asyncHandler(async (req, res) => {
    const refreshToken =
      req.cookies?.refreshToken;
      console.log("\n===== REFRESH =====");
console.log("URL:", req.originalUrl);
console.log("Headers Cookie:", req.headers.cookie);
console.log("Parsed Cookies:", req.cookies);
console.log("Refresh Exists:", !!refreshToken);

    await authService.logout(
      refreshToken
    );

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return successResponse(res, {
      statusCode: 200,
      message: "Logout successful",
    });
  });

  logoutAll = asyncHandler(
    async (req, res) => {
      await authService.logoutAll(
        req.user.userId
      );

      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");

      return successResponse(res, {
        statusCode: 200,
        message:
          "Logged out from all devices",
      });
    }
  );

  me = asyncHandler(async (req, res) => {
    const user =
      await authService.getMe(
        req.user.userId
      );

    return successResponse(res, {
      statusCode: 200,
      message: "User fetched successfully",
      data: user,
    });
  });
}

module.exports = new AuthController();