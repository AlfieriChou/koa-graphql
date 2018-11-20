const User = require('../models/user')

const userTypeDefs = `
  type User {
    id: ID!
    username: String!
    phone: String!
    description: String
  }
  input UserFilterInput {
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
const userResolvers = {
  Query: {
    users: async (_, { filter = {} }) => {
      const users = await User.find({}, null, filter)
      return users.map(user => user)
    },
    user: async (_, { id }) => {
      const user = await User.findById(id)
      return user
    }
  },
  Mutation: {
    addUser: async (_, { input }) => {
      const user = await User.create(input)
      return user
    },
    editUser: async (_, { id, input }) => {
      const user = await User.findByIdAndUpdate(id, input)
      return user
    },
    deleteUser: async (_, { id }) => {
      const user = await User.findByIdAndRemove(id)
      return user | null
    }
  }
}

module.exports = {
  userTypeDefs,
  userResolvers
}
