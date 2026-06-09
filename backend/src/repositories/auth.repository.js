const Auth = require("../models/Auth");

class AuthRepository {
  async create(payload) {
    return Auth.create(payload);
  }

  async findById(id) {
    return Auth.findById(id);
  }

  async findByEmail(email) {
    return Auth.findOne({
      email: email.toLowerCase(),
    });
  }

  async findByUserId(userId) {
    return Auth.findOne({
      user: userId,
    });
  }

  async updateById(id, payload) {
    return Auth.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
  }
}

module.exports = new AuthRepository();