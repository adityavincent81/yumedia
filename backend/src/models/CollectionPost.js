const mongoose = require("mongoose");

const collectionPostSchema =
  new mongoose.Schema(
    {
      collection: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Collection",
        required: true,
        index: true,
      },

      post: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
        index: true,
      },
    },
    {
      timestamps: true,
    }
  );

collectionPostSchema.index(
  {
    collection: 1,
    post: 1,
  },
  {
    unique: true,
  }
);

collectionPostSchema.index({
  collection: 1,
  createdAt: -1,
});

collectionPostSchema.index({
  post: 1,
});

module.exports =
  mongoose.model(
    "CollectionPost",
    collectionPostSchema
  );