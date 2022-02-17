const InstaPhotosService = require('../services/insta-photos-service');
const UserService = require('../services/user-service');

class InstaPhotosController {
  async getPhotos(req, res) {
    try {
      const { status, data = [] } = await InstaPhotosService.getPhotos();
      return res.status(status).json(data);
    } catch(e) {
      console.log(e);
      res.status(500).json({message: 'Error'});
    }
  }

  async setPhotos(req, res) {
    try {
      const data = req.body;
      const { status } = await InstaPhotosService.setPhotos(data);
      return res.sendStatus(status);
    } catch(e) {
      console.log(e);
      res.status(500).json({message: 'Error'});
    }
  }
}

module.exports = new InstaPhotosController;
