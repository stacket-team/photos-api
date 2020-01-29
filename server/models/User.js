const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user',
    required: true
  },
  photos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photo'
    }
  ]
})

module.exports = {
  User: mongoose.model('User', UserSchema)
}
