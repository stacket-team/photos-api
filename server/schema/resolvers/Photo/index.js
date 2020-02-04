const fs = require('fs')
const UPLOADS_DIR = '/uploaded/'
const { models } = require('../../../models')
const { Photo, User } = models

module.exports = {
  Photo: {
    Query: {
      photo: async (parent, { _id }, context, info) => {
        return await Photo.findOne({ _id }).exec()
      },
      photos: async (parent, { author, title }, context, info) => {
        const query = {}
        if (author) query.author = author
        if (title) query.title = new RegExp(title, 'i');
        const photos = await Photo.find(query)
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
      uploadPhoto: async (parent, { file, photo }, { user }, info) => {
        if (!user) throw new Error('Not authorized')

        const { createReadStream, filename, mimetype } = await file
        const stream = createReadStream()

        if (!/image\/.*/.test(mimetype)) throw new Error('Bad mimetype')

        const photoData = {
          title: photo.title || '',
          description: photo.description || '',
          author: photo.author
        }
        if (photo.date) photoData.date = photo.date
        const newPhoto = await new Photo(photoData)
        newPhoto.src = `${UPLOADS_DIR}${newPhoto._id}.${filename.split('.').pop()}`
        
        try {
          await newPhoto.save()
          
          if (!fs.existsSync('.'+UPLOADS_DIR)) fs.mkdirSync('.'+UPLOADS_DIR)
          const writeStream = fs.createWriteStream('.'+newPhoto.src)
          stream.pipe(writeStream)

          const creator = await User.findById(photo.author)
          if (!creator) throw new Error('User not found.')
          creator.photos.push(newPhoto)
          await creator.save()
    
          return newPhoto
        } catch (e) {
          console.log(e)
          throw e
        }
      },
      updatePhoto: async (parent, { _id, photo }, { user }, info) => {
        if (!user || (user._id !== photo.author.toString() && user.role !== 'admin')) throw new Error('Not authorized')
        return new Promise((resolve, reject) => {
          Photo.findOneAndUpdate({ _id }, { $set: { ...photo } }, { new: true }).exec(
            (err, res) => {
              err ? reject(err) : resolve(res)
            }
          )
        })
      },
      deletePhoto: async (parent, { _id }, { user }, info) => {
        if (!user) throw new Error('Not authorized')
        try {
          const photo = await Photo.findById(_id)
          if (user._id !== photo.author.toString() && user.role !== 'admin') throw new Error('Not authorized')
          const creator = await User.findById(photo.author)
          if (!creator) {
            throw new Error('User not found.')
          }
          const index = creator.photos.indexOf(_id)
          if (index > -1) {
            creator.photos.splice(index, 1)
          }
          await creator.save()
          if (!fs.existsSync('.'+UPLOADS_DIR)) fs.mkdirSync('.'+UPLOADS_DIR)
          fs.unlinkSync('.'+photo.src)
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
