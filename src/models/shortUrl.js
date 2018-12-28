const mongoose = require('mongoose')

const shortSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  timestamp: {
    type: String,
    required: true
  },
  short_hash: {
    type: String
  }
})
shortSchema.set('toObject', { virtuals: true })

module.exports = mongoose.model('Short', shortSchema)
