const jwt = require("jsonwebtoken");

const userRepository = require("../../repositories/user.repository");
const authRepository = require("../../repositories/auth.repository");
const sessionRepository = require("../../repositories/session.repository");

const generateUsername = require("../../utils/generateUsername");
const hashPassword = require("../../utils/hashPassword");
const comparePassword = require("../../utils/comparePassword");
const generateTokens = require("../../utils/generateTokens");
const hashToken = require("../../utils/hashToken");

const AppError = require("../../utils/AppError");

class AuthService {
  async register(data) {
    const { fullName, nim, email, password } =
      data;

    const existingEmail =
      await authRepository.findByEmail(
        email
      );

    if (existingEmail) {
      throw new AppError(
        "Email already exists",
        409
      );
    }

    const existingNim =
      await userRepository.findByNim(nim);

    if (existingNim) {
      throw new AppError(
        "NIM already exists",
        409
      );
    }

    let username =
      generateUsername(fullName, nim);

    const usernameExists =
      await userRepository.findByUsername(
        username
      );

    if (usernameExists) {
      username = `${username}${Date.now()
        .toString()
        .slice(-4)}`;
    }

    const passwordHash =
      await hashPassword(password);

    const user =
      await userRepository.create({
        fullName,
        nim,
        username,
      });

    await authRepository.create({
      user: user._id,
      email,
      passwordHash,
    });

    return {
      user,
    };
  }

  async login(data) {
    const { nim, password } = data;

    const user =
      await userRepository.findByNim(nim);

    if (!user) {
      throw new AppError(
        "Invalid credentials",
        401
      );
    }

    const auth =
      await authRepository.findByUserId(
        user._id
      );

    if (!auth) {
      throw new AppError(
        "Invalid credentials",
        401
      );
    }

    const isPasswordValid =
      await comparePassword(
        password,
        auth.passwordHash
      );

    if (!isPasswordValid) {
      throw new AppError(
        "Invalid credentials",
        401
      );
    }

    const {
      accessToken,
      refreshToken,
    } = generateTokens(user);

    await sessionRepository.create({
      user: user._id,
      refreshTokenHash:
        hashToken(refreshToken),
      expiresAt: new Date(
        Date.now() +
          7 * 24 * 60 * 60 * 1000
      ),
    });

    await authRepository.updateById(
      auth._id,
      {
        lastLoginAt: new Date(),
        loginAttempts: 0,
        lockedUntil: null,
      }
    );

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new AppError(
        "Refresh token required",
        401
      );
    }

    let decoded;

    try {
      decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET
      );
    } catch {
      throw new AppError(
        "Invalid or expired refresh token",
        401
      );
    }

    const refreshTokenHash =
      hashToken(refreshToken);

    const session =
      await sessionRepository.findByRefreshTokenHash(
        refreshTokenHash
      );

    if (!session) {
      throw new AppError(
        "Session not found",
        401
      );
    }

    if (session.isRevoked) {
      throw new AppError(
        "Session revoked",
        401
      );
    }

    if (session.expiresAt < new Date()) {
      throw new AppError(
        "Session expired",
        401
      );
    }

    const user =
      await userRepository.findById(
        decoded.userId
      );

    if (!user) {
      throw new AppError(
        "User not found",
        404
      );
    }

    const {
      accessToken,
      refreshToken: newRefreshToken,
    } = generateTokens(user);

    await sessionRepository.updateRefreshTokenHash(
      session._id,
      hashToken(newRefreshToken)
    );

    return {
      accessToken,
      refreshToken:
        newRefreshToken,
    };
  }

  async logout(refreshToken) {
    if (!refreshToken) {
      return;
    }

    const refreshTokenHash =
      hashToken(refreshToken);

    const session =
      await sessionRepository.findByRefreshTokenHash(
        refreshTokenHash
      );

    if (!session) {
      return;
    }

    await sessionRepository.revokeById(
      session._id
    );
  }

  async logoutAll(userId) {
    await sessionRepository.revokeAllByUserId(
      userId
    );
  }

  async getMe(userId) {
    const user =
      await userRepository.findById(
        userId
      );

    if (!user) {
      throw new AppError(
        "User not found",
        404
      );
    }

    return user;
  }
}

module.exports = new AuthService();