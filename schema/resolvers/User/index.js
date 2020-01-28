const { models } = require('../../../models')
const { User, Photo } = models

module.exports = {
  User: {
    Query: {
      user: async (parent, { _id, name }, context, info) => {
        return _id
          ? await User.findOne({ _id }).exec()
          : await User.findOne({ name }).exec()
      },
      users: async (parent, args, context, info) => {
        const users = await User.find({})
          .populate()
          .exec()

        return users.map(u => ({
          _id: u._id.toString(),
          name: u.name,
          password: u.password,
          photos: u.photos
        }))
      }
    },
    Mutation: {
      createUser: async (parent, { user }, context, info) => {
        const newUser = await new User({
          name: user.name,
          password: user.password
        })

        return new Promise((resolve, reject) => {
          newUser.save((err, res) => {
            err ? reject(err) : resolve(res)
          })
        })
      },
      updateUser: async (parent, { _id, user }, context, info) => {
        return new Promise((resolve, reject) => {
          User.findByIdAndUpdate(_id, { $set: { ...user } }, { new: true }).exec(
            (err, res) => {
              err ? reject(err) : resolve(res)
            }
          )
        })
      },
      deleteUser: async (parent, { _id }, context, info) => {
        return new Promise((resolve, reject) => {
          User.findByIdAndDelete(_id).exec((err, res) => {
            err ? reject(err) : resolve(res)
          })
        })
      }
    },
    User: {
      photos: async ({ _id }, args, context, info) => {
        return await Photo.find({ author: _id })
      }
    }
  }
}
