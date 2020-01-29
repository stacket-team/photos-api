const { models } = require('../../../models')
const { Photo, User } = models

const { transformPhoto } = require('../merge')

module.exports = {
  Photo: {
    Query: {
      photo: async (parent, { _id, title }, context, info) => {
        return _id
          ? await Photo.findOne({ _id }).exec()
          : await Photo.findOne({ title }).exec()
      },
      photos: async (parent, args, context, info) => {
        const photos = await Photo.find({})
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
      createPhoto: async (parent, { photo }, context, info) => {
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
      updatePhoto: async (parent, { _id, photo }, context, info) => {
        return new Promise((resolve, reject) => {
          Photo.findByIdAndUpdate(_id, { $set: { ...photo } }, { new: true }).exec(
            (err, res) => {
              err ? reject(err) : resolve(res)
            }
          )
        })
      },
      deletePhoto: async (parent, { _id }, context, info) => {
        try {
          const photo = await Photo.findById(_id)
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
            Photo.findByIdAndDelete(_id).exec((err, res) => {
              err ? reject(err) : resolve(res)
            })
          })
        } catch (error) {
          console.log(error)
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
