const multer = require("multer");

const storage =
  multer.memoryStorage();

const imageFilter = (
  req,
  file,
  cb
) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (
    !allowedMimeTypes.includes(
      file.mimetype
    )
  ) {
    return cb(
      new Error(
        "Only JPG, JPEG, PNG, and WEBP images are allowed"
      ),
      false
    );
  }

  cb(null, true);
};

const mediaFilter = (
  req,
  file,
  cb
) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",

    "video/mp4",
    "video/webm",
    "video/quicktime",
  ];

  if (
    !allowedMimeTypes.includes(
      file.mimetype
    )
  ) {
    return cb(
      new Error(
        "Only images and videos are allowed"
      ),
      false
    );
  }

  cb(null, true);
};

const avatarUpload = multer({
  storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const coverUpload = multer({
  storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

const postUpload = multer({
  storage,
  fileFilter: mediaFilter,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

module.exports = {
  avatarUpload,
  coverUpload,
  postUpload,
};