/* eslint-disable no-undef */
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: { type: String, require: true },
  email: { type: String, require: false },
  phone: { type: String, require: true },
  bookingRoom: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  bookingDate: { type: Array, require: true },
  totalAmount: { type: Number, require: true },
  createAt: { type: Number, require: true },
})
module.exports = mongoose.model('Booking', bookingSchema);