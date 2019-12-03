/* eslint-disable no-undef */
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  fullname: { type: String, require: true },
  email: { type: String, require: false },
  phone: { type: String, require: true },
  bookedRooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
  checkInDate: { type: Number, require: true },
  checkOutDate: { type: Number, require: true },
  totalAmount: { type: Number, require: true },
  createAt: { type: Number, require: true },
})
module.exports = mongoose.model('Booking', bookingSchema);