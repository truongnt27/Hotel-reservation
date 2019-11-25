/* eslint-disable no-undef */
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: { type: String, require: true },
  email: { type: String, require: false },
  phone: { type: String, require: true },
  bookedRooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
  checkInDate: { type: Date, require: true },
  checkOutDate: { type: Date, require: true },
  totalAmount: { type: Number, require: true },
  createAt: { type: Number, require: true },
})
module.exports = mongoose.model('Booking', bookingSchema);