const Short = require('../models/shortUrl')

class ShortController {
  async index (ctx) {
    const params = ctx.params
    const short = await Short.findOne({ short_hash: params.type })
    if (!short) ctx.throw(404, '没有找到链接')
    ctx.redirect(short.url)
  }
}

module.exports = new ShortController()
