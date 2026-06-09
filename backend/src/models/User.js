const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      default: null,
    },

    publicId: {
      type: String,
      default: null,
    },
  },
  {
    _id: false,
  }
);

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    nim: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
      index: true,
    },

    avatar: {
      type: mediaSchema,
      default: () => ({
        url: null,
        publicId: null,
      }),
    },

    cover: {
      type: mediaSchema,
      default: () => ({
        url: null,
        publicId: null,
      }),
    },

    bio: {
      type: String,
      default: "",
      maxlength: 300,
    },

    faculty: {
      type: String,
      default: null,
      trim: true,
    },

    major: {
      type: String,
      default: null,
      trim: true,
    },

    batchYear: {
      type: Number,
      default: null,
      min: 1900,
      max: 2100,
    },

    website: {
      type: String,
      default: null,
      trim: true,
    },

    location: {
      type: String,
      default: null,
      trim: true,
      maxlength: 100,
    },

    followersCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    followingCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    postsCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastSeenAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.index(
  { username: 1 },
  { unique: true }
);

userSchema.index(
  { nim: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "User",
  userSchema
);