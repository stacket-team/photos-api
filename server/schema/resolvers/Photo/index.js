const { models } = require('../../../models')
const { Photo, User } = models

const { transformPhoto } = require('../merge')

module.exports = {
  Photo: {
    Query: {
      photo: async (parent, { _id }, context, info) => {
        return await Photo.findOne({ _id }).exec()
      },
      photos: async (parent, { author }, context, info) => {
        const search = {}
        if (author) search.author = author
        const photos = await Photo.find(search)
          .populate()
          .exec()

        return photos.map(p => ({
          _id: p._id.toString(),
          src: p.src,
          title: p.title,
          description: p.description,
          author: p.author,
          date: p.date
        }))
      }
    },
    Mutation: {
      createPhoto: async (parent, { photo }, { user }, info) => {
        if (!user) throw new Error('Not authorized')
        const photoData = {
          src: photo.src,
          title: photo.title || '',
          description: photo.description || '',
          author: photo.author
        }
        if (photo.date) photoData.date = photo.date
        const newPhoto = await new Photo(photoData)

        let createdPhoto
        try {
          const result = await new Promise((resolve, reject) => {
            newPhoto.save((err, res) => {
              err ? reject(err) : resolve(res)
            })
          })
          createdPhoto = transformPhoto(result)
          const creator = await User.findById(photo.author)

          if (!creator) {
            throw new Error('User not found.')
          }
          creator.photos.push(newPhoto)
          await creator.save()
          return createdPhoto
        } catch (error) {
          console.log(error)
          throw error
        }
      },
      updatePhoto: async (parent, { _id, photo }, { user }, info) => {
        if (!user || (user._id !== photo.author && user.role !== 'admin')) throw new Error('Not authorized')
        return new Promise((resolve, reject) => {
          Photo.findOneAndUpdate({ _id }, { $set: { ...photo } }, { new: true }).exec(
            (err, res) => {
              err ? reject(err) : resolve(res)
            }
          )
        })
      },
      deletePhoto: async (parent, { _id }, { user }, info) => {
        if (!user || user.role !== 'admin') throw new Error('Not authorized')
        try {
          const photo = await Photo.findById(_id)
          if (user._id !== photo.author) throw new Error('Not authorized')
          const creator = await User.findById(photo.author)
          if (!creator) {
            throw new Error('User not found.')
          }
          const index = creator.photos.indexOf(_id)
          if (index > -1) {
            creator.photos.splice(index, 1)
          }
          await creator.save()
          return new Promise((resolve, reject) => {
            Photo.findOneAndDelete({ _id }).exec((err, res) => {
              err ? reject(err) : resolve(res)
            })
          })
        } catch (error) {
          throw error
        }
      }
    },
    Photo: {
      author: async ({ author }, args, context, info) => {
        return await User.findById(author)
      }
    }
  }
}
