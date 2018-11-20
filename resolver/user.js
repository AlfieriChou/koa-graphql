const User = require('../models/user')

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

module.exports = userResolvers
