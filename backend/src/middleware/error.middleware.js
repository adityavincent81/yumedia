const multer = require("multer");
const { ZodError } = require("zod");

const {
  errorResponse,
} = require("../utils/Response");

const errorMiddleware = (
  err,
  req,
  res,
  next
) => {
  console.error(err);

  if (err instanceof ZodError) {
    return errorResponse(res, {
      statusCode: 400,
      message: "Validation failed",
      errors: err.flatten(),
    });
  }

  if (
    err instanceof multer.MulterError
  ) {
    let message = err.message;
    let statusCode = 400;

    if (
      err.code ===
      "LIMIT_FILE_SIZE"
    ) {
      statusCode = 413;
      message =
        "Uploaded file is too large";
    }

    return errorResponse(res, {
      statusCode,
      message,
    });
  }

  if (
    err.message?.includes(
      "Only JPG"
    ) ||
    err.message?.includes(
      "Only JPEG"
    ) ||
    err.message?.includes(
      "Only PNG"
    ) ||
    err.message?.includes(
      "Only WEBP"
    )
  ) {
    return errorResponse(res, {
      statusCode: 400,
      message: err.message,
    });
  }

  if (
    err.name ===
      "CloudinaryError" ||
    err.http_code
  ) {
    return errorResponse(res, {
      statusCode: 500,
      message:
        "Cloudinary upload failed",
    });
  }

  if (err.statusCode) {
    return errorResponse(res, {
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors || null,
    });
  }

  return errorResponse(res, {
    statusCode: 500,
    message: "Internal Server Error",
  });
};

module.exports = errorMiddleware;