const bcrypt = require("bcryptjs");

async function comparePassword(password, passwordHash) {
  return bcrypt.compare(password, passwordHash);
}

module.exports = comparePassword;