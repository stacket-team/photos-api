const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { models } = require('../../../models')
const { User, Photo } = models
const fs = require('fs')

module.exports = {
  User: {
    Query: {
      currentUser: async (parent, args, { user }, info) => {
        return user ? await User.findOne({ _id: user._id }).exec() : user;
      },
      user: async (parent, { _id, name }, { user }, info) => {
        if (!user || ((_id ? user._id !== _id : user.name !== name) && user.role !== 'admin')) throw new Error('Not authorized')
        return _id
          ? await User.findOne({ _id }).exec()
          : await User.findOne({ name, role: 'user' }).exec()
      },
      users: async (parent, { name }, { user }, info) => {
        if (!user || user.role !== 'admin') throw new Error('Not authorized')
        const query = { role: 'user' }
        if (name) query.name = new RegExp(name, 'i')
        const users = await User.find(query)
          .populate()
          .exec()

        return users.map(u => ({
          _id: u._id.toString(),
          name: u.name,
          password: u.password,
          role: u.role,
          photos: u.photos,
          domain: u.domain
        }))
      }
    },
    Mutation: {
      login: async (parent, { name, password }, context, info) => {
        const user = await User.findOne({ name }).exec()

        if (!user) {
          throw new Error('Invalid Login')
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
          throw new Error('Invalid Login')
        }

        const token = jwt.sign(
          {
            _id: user._id,
            name: user.name,
            role: user.role
          },
          process.env.SECRET,
          {
            expiresIn: '30d',
          },
        )

        return {
          token,
          user,
        }
      },
      createUser: async (parent, { name, password, domain }, { user }, info) => {
        if (!user || user.role !== 'admin') throw new Error('Not authorized')
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await new User({
          name,
          password: hashedPassword,
          domain
        })

        return new Promise((resolve, reject) => {
          newUser.save((err, res) => {
            err ? reject(err) : resolve(res)
          })
        })
      },
      updateUser: async (parent, { _id, name, password, domain }, { user }, info) => {
        if (!user || (_id !== user._id && user.role !== 'admin')) throw new Error('Not authorized')
        const $set = {}
        if (name) $set.name = name
        if (password) $set.password = await bcrypt.hash(password, 10)
        if (domain) $set.domain = domain
        return new Promise((resolve, reject) => {
          User.findOneAndUpdate({ _id }, { $set }, { new: true }).exec( 
            (err, res) => {
              err ? reject(err) : resolve(res)
            }
          )
        })
      },
      deleteUser: async (parent, { _id }, { user }, info) => {
        if (!user || (_id !== user._id && user.role !== 'admin')) throw new Error('Not authorized')
        return new Promise((resolve, reject) => {
          User.findOneAndDelete({ _id }).exec((err, res) => {
            if (err) { 
              reject(err) 
            } else {
              Photo.find({ author: _id })
                .then(photos => {
                  for (let photo of photos) {
                    Photo.findOneAndDelete({ _id: photo._id }).exec()
                    fs.unlinkSync('.'+photo.src)
                  }
                })
                .catch((e) => {
                  console.log(e)
                })
                .finally(() => {
                  resolve(res)
                })
            }
          })
        })
      }
    },
    User: {
      photos: async ({ _id }, args, { user }, info) => {
        if (!user) throw new Error('Not authorized')
        return await Photo.find({ author: _id })
      }
    }
  }
}
