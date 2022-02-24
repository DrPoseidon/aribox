const {Schema, model} = require('mongoose');

const InstaPhotosSchema = new Schema({
  date: Number,
  photos: [
    {
      id: {
        type: String,
        required:true
      },
      caption: {
        type: String,
        required:true
      },
      mediaUrl: {
        type: String,
        required:true
      },
      permalink: {
        type: String,
        required:true
      },
    }
  ]
})

module.exports = model('InstaPhotos', InstaPhotosSchema);
