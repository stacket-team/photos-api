const { mergeResolvers } = require('merge-graphql-schemas')

const { User } = require('./User')
const { Photo } = require('./Photo')

const resolvers = [User, Photo]

module.exports = {
  resolvers: mergeResolvers(resolvers)
}
