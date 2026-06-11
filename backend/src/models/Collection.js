const mongoose = require("mongoose");

const collectionSchema =
  new mongoose.Schema(
    {
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
      },

      description: {
        type: String,
        trim: true,
        maxlength: 500,
        default: "",
      },

      coverImage: {
        type: String,
        trim: true,
        default: "",
      },

      isPrivate: {
        type: Boolean,
        default: true,
      },

      postsCount: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    {
      timestamps: true,
    }
  );

collectionSchema.index({
  owner: 1,
  createdAt: -1,
});

collectionSchema.index({
  owner: 1,
  name: 1,
});

module.exports =
  mongoose.model(
    "Collection",
    collectionSchema
  );