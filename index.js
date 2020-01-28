require('dotenv').config()
const { ApolloServer, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const { models } = require('./models')
const { schema } = require('./schema')

const { mongoURI: db } = process.env
const pubsub = new PubSub()

const context = {
  models,
  pubsub
}

mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.error(error))

const server = new ApolloServer({ schema, context })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
