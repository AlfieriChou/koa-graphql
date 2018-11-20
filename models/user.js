const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
})
userSchema.set('toObject', { virtuals: true })

module.exports = mongoose.model('User', userSchema)
