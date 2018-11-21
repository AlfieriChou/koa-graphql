const User = require('../models/user')
const bcrypt = require('bcrypt')
const moment = require('moment')
const jwt = require('jsonwebtoken')

const createToken = (user) => {
  let payload = {
    sub: { user },
    exp: moment().add(7, 'day').unix()
  }
  return jwt.sign(payload, 'koa-graphql')
}

const loginResolvers = {
  Mutation: {
    login: async (_, { input }) => {
      const user = await User.findOne({ phone: input.phone })
      if (!user) throw new Error('用户不存在')
      await bcrypt.compare(input.password, user.password)
      const token = await createToken(user)
      return {
        token: token
      }
    }
  }
}

module.exports = loginResolvers
