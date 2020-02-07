require("dotenv").config()
const express = require("express")
const { ApolloServer } = require("apollo-server-express")
const mongoose = require("mongoose")
const path = require("path")
const http = require("http")
const https = require("https")
const jwt = require("jsonwebtoken")
const fs = require("fs")
const cors = require("cors")

const configurations = {
  production: { react: true, ssl: false, port: 80, hostname: "localhost", db: "mongodb://localhost:27017/photos-api" },
  development: { react: false, ssl: false, port: 5000, hostname: "localhost", db: "mongodb://localhost:27017/photos-api" }
}

const environment = process.env.NODE_ENV || "production"
const config = configurations[environment]
config.baseUrl = `http${config.ssl ? "s" : ""}://${config.hostname}${[80,443].includes(config.port) ? '' : `:${config.port}`}`

mongoose
  .connect(config.db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log(`MongoDB is connected on ${config.db}`))
  .catch(error => console.error(error))

const getUser = token => {
  try {
    if (token) {
      return jwt.verify(token, process.env.SECRET)
    }
    return null
  } catch (err) {
    return null
  }
}

const { models, schema } = require("./server")
const apollo = new ApolloServer({
  schema,
  context: ({ req }) => {
    const tokenWithBearer = req.headers.authorization || ""
    const token = tokenWithBearer.split(" ")[1]
    const user = getUser(token)

    return { user }
  }
})

const app = express()

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || origin.match(/https?:\/\/[a-z0-9\.]+:?[0-9]*/)[0] === config.baseUrl) {
      callback(null, true)
    } else {
      models.User.findOne({ domain: origin }).exec((err, res) => {
        if (err || !res) {
          callback(new Error(`${origin} is not allowed by CORS`))
        } else {
          callback(null, true)
        }
      })
    }
  }
};

app.use(cors(corsOptions));

if (!fs.existsSync('./uploaded')) fs.mkdirSync('./uploaded')
app.use('/uploaded/', express.static(path.join(__dirname, "./uploaded")))

apollo.applyMiddleware({ app })

if (config.react) {
  app.use(express.static(path.join(__dirname, "client/build")))
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"))
  })
}

let server
if (config.ssl) {
  server = https.createServer(
    {
      key: fs.readFileSync(`./ssl/${environment}/server.key`),
      cert: fs.readFileSync(`./ssl/${environment}/server.crt`)
    },
    app
  )
} else {
  server = http.createServer(app)
}

server.listen({ port: config.port }, () => {
  console.log(
    `${config.react ? 'React' : 'Server'} ready at`,
    `${config.baseUrl}/`
  )
  console.log(
    "Graphql endpoint ready at",
    `${config.baseUrl}${apollo.graphqlPath}`
  )
})
