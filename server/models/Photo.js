const mongoose = require('mongoose')

const PhotoSchema = new mongoose.Schema({
  src: {
    type: String
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  tags: {
    type: [String]
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
