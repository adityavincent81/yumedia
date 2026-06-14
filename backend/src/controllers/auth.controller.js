const authService = require("../services/auth/auth.service");

const {
  registerSchema,
  loginSchema,
} = require("../validators/auth.validator");

const asyncHandler = require("../utils/asyncHandler");

const {
  successResponse,
} = require("../utils/Response");

const {
  baseCookieOptions,
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} = require("../utils/cookie");

class AuthController {
  register = asyncHandler(async (req, res) => {
    const validatedData =
      registerSchema.parse(req.body);

    const result =
      await authService.register(validatedData);

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
      accessTokenCookieOptions
    );

    res.cookie(
      "refreshToken",
      result.refreshToken,
      refreshTokenCookieOptions
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

    const result =
      await authService.refresh(
        refreshToken
      );

    res.cookie(
      "accessToken",
      result.accessToken,
      accessTokenCookieOptions
    );

    res.cookie(
      "refreshToken",
      result.refreshToken,
      refreshTokenCookieOptions
    );

    return successResponse(res, {
      statusCode: 200,
      message:
        "Token refreshed successfully",
    });
  });

  logout = asyncHandler(async (req, res) => {
    const refreshToken =
      req.cookies?.refreshToken;

    await authService.logout(
      refreshToken
    );

    res.clearCookie(
      "accessToken",
      baseCookieOptions
    );

    res.clearCookie(
      "refreshToken",
      baseCookieOptions
    );

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

      res.clearCookie(
        "accessToken",
        baseCookieOptions
      );

      res.clearCookie(
        "refreshToken",
        baseCookieOptions
      );

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
      message:
        "User fetched successfully",
      data: user,
    });
  });
}

module.exports = new AuthController();