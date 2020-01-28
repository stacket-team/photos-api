require('dotenv').config()
const express = require('express')
const path = require('path')
const { ApolloServer, PubSub } = require('apollo-server-express')
const mongoose = require('mongoose')
const { models } = require('./models')
const { schema } = require('./schema')

const { NODE_ENV: env, MONGO_URI: db } = process.env

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
  .then(() => console.log(`MongoDB is connected on ${db}`))
  .catch(error => console.error(error))

const server = new ApolloServer({ schema, context })

const app = express()

server.applyMiddleware({ app, path: '/graphql' })

if (env === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'))
  })
} 

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Express is working on https://localhost:${port}/`)
  console.log(`Graphql endpoint: https://localhost:${port}/graphql`)
  if (env === 'production') {
    console.log(`Dashboard: https://localhost:${port}/`);
  } else {
    console.log(`Dashboard: https://localhost:3000/`)
  }
})