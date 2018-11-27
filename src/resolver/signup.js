const User = require('../models/user')
const bcrypt = require('bcrypt')

const signupResolvers = {
  Mutation: {
    signup: async (_, { input }) => {
      input.password = await bcrypt.hash(input.password, 10)
      const exists = await User.findOne({ phone: input.phone })
      if (exists) throw new Error('改手机号已使用')
      const user = await User.create(input)
      return user
    }
  }
}

module.exports = signupResolvers
