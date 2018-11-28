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

class UserController {
  async login (ctx) {
    const params = ctx.request.body
    const user = await User.findOne({ phone: params.phone })
    if (!user) ctx.throw(404, '用户不存在')
    await bcrypt.compare(params.password, user.password)
    const token = await createToken(user)
    ctx.body = {
      token: token
    }
  }
  async signup (ctx) {
    const params = ctx.request.body
    params.password = await bcrypt.hash(params.password, 10)
    const exists = await User.findOne({ phone: params.phone })
    if (exists) ctx.throw(400, '该手机号已使用')
    const user = await User.create(params)
    ctx.body = user
  }
}

module.exports = new UserController()
