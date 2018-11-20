const userTypeDefs = `
  type User {
    id: ID!
    username: String!
    phone: String!
    description: String
  }
  input UserFilterInput {
    skip: Int
    limit: Int
  }
  extend type Query {
    users(filter: UserFilterInput): [User]
    user(id: String!): User
  }
  input UserInput {
    username: String!
    phone: String!
    description: String
  }
  extend type Mutation {
    addUser(input: UserInput!): User
    editUser(id: String!, input: UserInput!): User
    deleteUser(id: String!): User
  }
`

module.exports = userTypeDefs
