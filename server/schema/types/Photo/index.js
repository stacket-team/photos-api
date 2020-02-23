const Photo = `
  scalar Upload

  type Photo {
    _id: String!
    src: String!
    title: String!
    description: String!
    tags: [String]!
    author: User!
    date: String!
  }

  type Query {
    photo(_id: ID): Photo
    photos(author: ID, tag: String, title: String): [Photo!]!
  }

  type Mutation {
    uploadPhoto(file: Upload!, photo: CreatePhotoInput!): Photo!
    updatePhoto(_id: String!, photo: UpdatePhotoInput!): Photo!
    deletePhoto(_id: String!): Photo
  }
  
  input CreatePhotoInput {
    title: String
    description: String
    tags: [String]
    author: String!
    date: String
  }

  input UpdatePhotoInput {
    title: String
    description: String
    tags: [String]
    author: String
    date: String
  } 
`

module.exports = {
  Photo
}
