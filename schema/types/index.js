const { mergeTypes } = require('merge-graphql-schemas')

const { User } = require('./User')
const { Photo } = require('./Photo')

const typeDefs = [User, Photo]

module.exports = { typeDefs: mergeTypes(typeDefs, { all: true }) }
