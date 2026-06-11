const collectionService = require(
  "../services/collection/collection.service"
);

const createCollection =
  async (req, res, next) => {
    try {
      const collection =
        await collectionService.createCollection(
          req.user.userId,
          req.body
        );

      res.status(201).json({
        success: true,

        message:
          "Collection created successfully",

        data: collection,
      });
    } catch (error) {
      next(error);
    }
  };

const getMyCollections =
  async (req, res, next) => {
    try {
      const page =
        Number(req.query.page) || 1;

      const limit =
        Number(req.query.limit) || 20;

      const collections =
        await collectionService.getMyCollections(
          req.user.userId,
          page,
          limit
        );

      res.json({
        success: true,

        data: collections,
      });
    } catch (error) {
      next(error);
    }
  };

const getCollectionById =
  async (req, res, next) => {
    try {
      const collection =
        await collectionService.getCollectionById(
          req.params.collectionId
        );

      res.json({
        success: true,

        data: collection,
      });
    } catch (error) {
      next(error);
    }
  };

const updateCollection =
  async (req, res, next) => {
    try {
      const collection =
        await collectionService.updateCollection(
          req.user.userId,
          req.params.collectionId,
          req.body
        );

      res.json({
        success: true,

        message:
          "Collection updated successfully",

        data: collection,
      });
    } catch (error) {
      next(error);
    }
  };

const deleteCollection =
  async (req, res, next) => {
    try {
      await collectionService.deleteCollection(
        req.user.userId,
        req.params.collectionId
      );

      res.json({
        success: true,

        message:
          "Collection deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };

const addPostToCollection =
  async (req, res, next) => {
    try {
      const result =
        await collectionService.addPostToCollection(
          req.user.userId,
          req.params.collectionId,
          req.body.postId
        );

      res.status(201).json({
        success: true,

        message:
          "Post added to collection successfully",

        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

const removePostFromCollection =
  async (req, res, next) => {
    try {
      const result =
        await collectionService.removePostFromCollection(
          req.user.userId,
          req.params.collectionId,
          req.params.postId
        );

      res.json({
        success: true,

        message:
          "Post removed from collection successfully",

        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

const getCollectionPosts =
  async (req, res, next) => {
    try {
      const page =
        Number(req.query.page) || 1;

      const limit =
        Number(req.query.limit) || 20;

      const result =
        await collectionService.getCollectionPosts(
          req.params.collectionId,
          page,
          limit
        );

      res.json({
        success: true,

        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

module.exports = {
  createCollection,

  getMyCollections,

  getCollectionById,

  updateCollection,

  deleteCollection,

  addPostToCollection,

  removePostFromCollection,

  getCollectionPosts,
};