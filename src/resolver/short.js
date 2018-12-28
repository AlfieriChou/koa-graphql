const Short = require('../models/shortUrl')
const validUrl = require('valid-url')
const shortId = require('shortid')

const shortResolvers = {
  Query: {
    user: async (_, { id }) => {
      const short = await Short.findById(id)
      if (!short) throw new Error('短链接不存在')
      return short
    }
  },
  Mutation: {
    addShort: async (_, { input }) => {
      if (!validUrl.isUri(input.url)) throw new Error('请确定链接的准确性')
      const exists = await Short.findOne({ url: input.url })
      if (exists) throw new Error('该短链接已存在')
      const short = new Short(input)
      short.timestamp = parseInt(new Date().valueOf())
      short.short_hash = shortId.generate()
      const result = await short.save()
      return result
    }
  }
}

module.exports = shortResolvers
