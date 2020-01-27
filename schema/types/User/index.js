const User = `
  type User {
    _id: String!
    name: String!
    password: String!
    photos: [Photo!]!
  }

  type Query {
    user(_id: ID!): User!
    users: [User!]!
  }

  type Mutation {
    createUser(user: CreateUserInput): User!
    updateUser(_id: String!, user: UpdateUserInput!): User!
    deleteUser(_id: String!): User!
  }

  input CreateUserInput {
    name: String!
    password: String!
  }
  
  input UpdateUserInput {
    name: String
    password: String
  } 
`

module.exports = {
  User
}
