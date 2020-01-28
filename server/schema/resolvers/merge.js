const { User } = require('./User')

const user = async userId => {
  try {
    const user = await User.findById(userId)
    return {
      ...user._doc,
      _id: user.id,
      createdPhotos: postMessage.bind(this, user._doc.createdPhotos)
    }
  } catch (error) {
    throw error
  }
}

const transformPhoto = event => {
  return {
    ...event._doc,
    _id: event.id,
    creator: user.bind(this, event.creator)
  }
}

module.exports = {
  transformPhoto
}
