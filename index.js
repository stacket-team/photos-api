require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const path = require("path");
const http = require("http");
const https = require("https");
const jwt = require("jsonwebtoken");

const configurations = {
  production: {
    react: true,
    ssl: false,
    port: 80,
    hostname: "localhost",
    db: "mongodb://localhost:27017/photos-api"
  },
  development: {
    react: false,
    ssl: false,
    port: 5000,
    hostname: "localhost",
    db: "mongodb://localhost:27017/photos-api"
  }
};

const environment = process.env.NODE_ENV || "production";
const config = configurations[environment];

mongoose
  .connect(config.db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log(`MongoDB is connected on ${config.db}`))
  .catch(error => console.error(error));

const getUser = token => {
  try {
    if (token) {
      return jwt.verify(token, process.env.SECRET);
    }
    return null;
  } catch (err) {
    return null;
  }
};

const { models, schema } = require("./server");
const apollo = new ApolloServer({
  schema,
  context: ({ req }) => {
    const tokenWithBearer = req.headers.authorization || "";
    const token = tokenWithBearer.split(" ")[1];
    const user = getUser(token);
    console.log(req.headers);

    return { user };
  }
});

const app = express();
apollo.applyMiddleware({ app });

if (config.react) {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}

let server;
if (config.ssl) {
  server = https.createServer(
    {
      key: fs.readFileSync(`./ssl/${environment}/server.key`),
      cert: fs.readFileSync(`./ssl/${environment}/server.crt`)
    },
    app
  );
} else {
  server = http.createServer(app);
}

server.listen({ port: config.port }, () => {
  console.log(
    "Server ready at",
    `http${config.ssl ? "s" : ""}://${config.hostname}:${config.port}/`
  );
  console.log(
    "Graphql endpoint ready at",
    `http${config.ssl ? "s" : ""}://${config.hostname}:${config.port}${
      apollo.graphqlPath
    }`
  );
  if (config.react) {
    console.log(
      "React ready at",
      `http${config.ssl ? "s" : ""}://${config.hostname}:${config.port}/`
    );
  }
});
