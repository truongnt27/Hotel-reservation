/* eslint-disable no-undef */
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  id: { type: String, require: true },
  name: { type: String, require: true },
  slug: String,
  type: String,
  price: { type: String, require: true },
  size: String,
  capacity: String,
  pets: {type: Boolean, default: false},
  breakfast: {type: Boolean, default: false},
  featured: {type: Boolean, default: false},
  description: String,
  extras: [String],
  images: [String]
})
module.exports = mongoose.model('Room', roomSchema);