const Session = require("../models/Session");

class SessionRepository {
  async create(payload) {
    return Session.create(payload);
  }

  async findById(id) {
    return Session.findById(id);
  }

  async findByRefreshTokenHash(refreshTokenHash) {
    return Session.findOne({
      refreshTokenHash,
      isRevoked: false,
    });
  }

  async findActiveByUserId(userId) {
    return Session.find({
      user: userId,
      isRevoked: false,
      expiresAt: { $gt: new Date() },
    }).sort({ createdAt: -1 });
  }

  async updateRefreshTokenHash(
    sessionId,
    refreshTokenHash
  ) {
    return Session.findByIdAndUpdate(
      sessionId,
      {
        refreshTokenHash,
      },
      {
        new: true,
      }
    );
  }

  async revokeById(id) {
    return Session.findByIdAndUpdate(
      id,
      {
        isRevoked: true,
      },
      {
        new: true,
      }
    );
  }

  async revokeAllByUserId(userId) {
    return Session.updateMany(
      {
        user: userId,
        isRevoked: false,
      },
      {
        isRevoked: true,
      }
    );
  }

  async deleteExpired() {
    return Session.deleteMany({
      expiresAt: {
        $lt: new Date(),
      },
    });
  }
}

module.exports = new SessionRepository();