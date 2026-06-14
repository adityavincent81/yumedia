const isProduction =
  process.env.NODE_ENV === "production";

/**
 * Base cookie options.
 *
 * Production:
 * - Secure cookie (HTTPS only)
 * - SameSite=None (required for cross-origin cookies:
 *   Frontend: Vercel
 *   Backend : Railway)
 *
 * Development:
 * - SameSite=Lax
 * - Secure=false
 */
const baseCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction
    ? "none"
    : "lax",
  path: "/",
};

const accessTokenCookieOptions = {
  ...baseCookieOptions,
  maxAge: 15 * 60 * 1000, // 15 minutes
};

const refreshTokenCookieOptions = {
  ...baseCookieOptions,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

module.exports = {
  baseCookieOptions,
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
};