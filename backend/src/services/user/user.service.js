const userRepository = require("../../repositories/user.repository");

const cloudinaryService = require("../cloudinary/cloudinary.service");

const AppError = require("../../utils/AppError");

class UserService {
  async getMyProfile(userId) {
    const user =
      await userRepository.findById(userId);

    if (!user) {
      throw new AppError(
        "User not found",
        404
      );
    }

    return user;
  }

  async getProfileByUsername(
    username
  ) {
    const user =
      await userRepository.findByUsername(
        username
      );

    if (!user) {
      throw new AppError(
        "User not found",
        404
      );
    }

    return user;
  }

  async updateMyProfile(
    userId,
    payload
  ) {
    const user =
      await userRepository.findById(userId);

    if (!user) {
      throw new AppError(
        "User not found",
        404
      );
    }

    const allowedFields = [
      "fullName",
      "bio",
      "faculty",
      "major",
      "batchYear",
      "website",
      "location",
    ];

    const updateData = {};

    for (const field of allowedFields) {
      if (
        Object.prototype.hasOwnProperty.call(
          payload,
          field
        )
      ) {
        updateData[field] =
          payload[field];
      }
    }

    return userRepository.updateProfile(
      userId,
      updateData
    );
  }

  async updateMyAvatar(
    userId,
    file
  ) {
    const user =
      await userRepository.findById(userId);

    if (!user) {
      throw new AppError(
        "User not found",
        404
      );
    }

    if (!file) {
      throw new AppError(
        "Avatar image is required",
        400
      );
    }

    if (
      user.avatar?.publicId
    ) {
      await cloudinaryService.deleteImage(
        user.avatar.publicId
      );
    }

    const uploaded =
      await cloudinaryService.uploadImage(
        file.buffer,
        "yumedia/avatars"
      );

    return userRepository.updateAvatar(
      userId,
      {
        url: uploaded.url,
        publicId:
          uploaded.publicId,
      }
    );
  }

  async updateMyCover(
    userId,
    file
  ) {
    const user =
      await userRepository.findById(userId);

    if (!user) {
      throw new AppError(
        "User not found",
        404
      );
    }

    if (!file) {
      throw new AppError(
        "Cover image is required",
        400
      );
    }

    if (
      user.cover?.publicId
    ) {
      await cloudinaryService.deleteImage(
        user.cover.publicId
      );
    }

    const uploaded =
      await cloudinaryService.uploadImage(
        file.buffer,
        "yumedia/covers"
      );

    return userRepository.updateCover(
      userId,
      {
        url: uploaded.url,
        publicId:
          uploaded.publicId,
      }
    );
  }
}

module.exports =
  new UserService();