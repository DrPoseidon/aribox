const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
  email: {type: String, required: true, unique: true},
  name: {type: String, required: true},
  password: {type:String, required: true},
  isActivated: {type: Boolean, default: false},
  activationLink: {type:String, required: true},
  cart: [
    {
      colorModel: {
        colorModelId: Number,
        colorName: String
      },
      discount: Number,
      name: String,
      price: Number,
      productId: String
    }
  ]
})

module.exports = model('User', UserSchema);
