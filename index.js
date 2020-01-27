require('dotenv').config()
const express = require('express')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')
const { PubSub } = require('graphql-subscriptions')
const models = require('./models')
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

const app = express()
app.use(cors())

app.use('/graphql', graphqlHTTP({ schema, context }))

const port = process.env.PORT || 4000
app.listen(port)
console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`)
