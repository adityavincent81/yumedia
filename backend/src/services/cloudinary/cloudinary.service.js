const streamifier = require("streamifier");

const cloudinary = require("../../config/cloudinary");

class CloudinaryService {
  async uploadImage(
    fileBuffer,
    folder
  ) {
    return new Promise(
      (resolve, reject) => {
        const uploadStream =
          cloudinary.uploader.upload_stream(
            {
              folder,
              resource_type: "image",
            },
            (error, result) => {
              if (error) {
                return reject(error);
              }

              resolve({
                publicId:
                  result.public_id,

                url:
                  result.secure_url,
              });
            }
          );

        streamifier
          .createReadStream(
            fileBuffer
          )
          .pipe(uploadStream);
      }
    );
  }

  async deleteImage(publicId) {
    if (!publicId) {
      return;
    }

    return cloudinary.uploader.destroy(
      publicId
    );
  }
}

module.exports =
  new CloudinaryService();