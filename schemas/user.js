const User = require('../models/user')

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
const userResolvers = {
  Query: {
    users: async (_, { filter = {} }) => {
      const users = await User.find({}, null, filter)
      return users
    },
    user: async (_, { id }) => {
      const user = await User.findById(id)
      if (!user) throw new Error('用户不存在')
      return user
    }
  },
  Mutation: {
    addUser: async (_, { input }) => {
      const exists = await User.findOne({ phone: input.phone })
      if (exists) throw new Error('该手机号已存在')
      const result = await User.create(input)
      return result
    },
    editUser: async (_, { id, input }) => {
      const exists = await User.findOne({ id: id })
      if (!exists) throw new Error('用户不存在')
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
