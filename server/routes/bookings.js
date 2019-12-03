/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Room = require('../models/room');

/*Get booking list*/
router.get('/', function (req, res, next) {
  Booking.find().populate('bookedRooms').exec((err, bookings) => {
    if (err) return res.json(err);
    res.json(bookings);
  })
});
module.exports = router;

/*Create a booking*/
router.post('/createBooking', function (req, res, next) {
  const booking = req.body.booking ? req.body.booking : {};

  const { rooms, userInfo, checkOutDate, checkInDate, totalAmount } = booking;
  const roomObjIds = rooms.map(room => room._id);
  const newBooking = new Booking({
    fullname: userInfo.fullname,
    phone: userInfo.phone,
    email: userInfo.email,
    bookedRooms: roomObjIds,
    checkInDate,
    checkOutDate,
    totalAmount,
    createAt: Date.now()
  })
  newBooking.save((err, booking) => {
    if (err) return err;
    rooms.forEach(room => {
      Room.findOne({ id: room.id }, (err, room) => {
        room.bookingRef.push(booking._id);
        room.save();
      })
    })
    res.json(booking);
  })
});