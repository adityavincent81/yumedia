const streamifier = require("streamifier");

const cloudinary = require("../../config/cloudinary");

class CloudinaryService {
  async uploadMedia(
    fileBuffer,
    folder,
    resourceType = "auto"
  ) {
    return new Promise(
      (resolve, reject) => {
        const uploadStream =
          cloudinary.uploader.upload_stream(
            {
              folder,
              resource_type:
                resourceType,
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

                resourceType:
                  result.resource_type,
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

  async uploadImage(
    fileBuffer,
    folder
  ) {
    return this.uploadMedia(
      fileBuffer,
      folder,
      "image"
    );
  }

  async deleteMedia(
    publicId,
    resourceType = "image"
  ) {
    if (!publicId) {
      return;
    }

    return cloudinary.uploader.destroy(
      publicId,
      {
        resource_type:
          resourceType,
      }
    );
  }

  async deleteImage(publicId) {
    return this.deleteMedia(
      publicId,
      "image"
    );
  }
}

module.exports =
  new CloudinaryService();