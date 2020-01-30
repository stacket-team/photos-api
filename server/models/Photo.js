const mongoose = require('mongoose')

const PhotoSchema = new mongoose.Schema({
  src: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

module.exports = {
  Photo: mongoose.model('Photo', PhotoSchema)
}
