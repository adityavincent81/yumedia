const userService = require("../services/user/user.service");

class UserController {
  async getMyProfile(req, res, next) {
    try {
      const user =
        await userService.getMyProfile(
          req.user.userId
        );

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProfileByUsername(
    req,
    res,
    next
  ) {
    try {
      const user =
        await userService.getProfileByUsername(
          req.params.username
        );

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateMyProfile(
    req,
    res,
    next
  ) {
    try {
      const user =
        await userService.updateMyProfile(
          req.user.userId,
          req.body
        );

      res.status(200).json({
        success: true,
        message:
          "Profile updated successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateMyAvatar(
    req,
    res,
    next
  ) {
    try {
      const user =
        await userService.updateMyAvatar(
          req.user.userId,
          req.file
        );

      res.status(200).json({
        success: true,
        message:
          "Avatar updated successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateMyCover(
    req,
    res,
    next
  ) {
    try {
      const user =
        await userService.updateMyCover(
          req.user.userId,
          req.file
        );

      res.status(200).json({
        success: true,
        message:
          "Cover updated successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();