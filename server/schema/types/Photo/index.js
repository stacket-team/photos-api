const Photo = `
  type Photo {
    _id: String!
    src: String!
    title: String!
    description: String!
    author: User!
    date: String!
  }

  type Query {
    photo(_id: ID, author: ID): Photo
    photos(author: ID): [Photo!]!
  }

  type Mutation {
    createPhoto(photo: CreatePhotoInput!): Photo!
    updatePhoto(_id: String!, photo: UpdatePhotoInput!): Photo!
    deletePhoto(_id: String!): Photo
  }

  input CreatePhotoInput {
    src: String
    title: String
    description: String
    author: String!
    date: String
  }
  
  input UpdatePhotoInput {
    src: String
    title: String
    description: String
    author: String
    date: String
  } 
`

module.exports = {
  Photo
}
