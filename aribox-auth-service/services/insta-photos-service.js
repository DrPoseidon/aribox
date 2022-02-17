const InstaPhotosModel = require('../models/insta-photos-model');

class InstaPhotosService {
  async getPhotos() {
    const photos = await InstaPhotosModel.find();

    if (photos) {
      return { status: 200, data: photos.length ? photos[0] : {}  };
    } else {
      return { status: 404 };
    }
  }

  async setPhotos(data) {
    try {
      let photos = await InstaPhotosModel.find();
      if (photos.length) {
        photos[0] = data;
        await photos.save();
      } else {
        await InstaPhotosModel.create(data);
      }

      return { status: 200 };
    } catch (e) {
      return { status: 500 };
    }
  }
}

module.exports = new InstaPhotosService();
