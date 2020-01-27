const Photo = `
  type Photo {
    _id: String!
    src: String!
    title: String
    description: String
    author: User!
    date: String!
  }

  type Query {
    photo(_id: ID!): Photo!
    photos: [Photo!]!
  }
`

module.exports = {
  Photo
}
