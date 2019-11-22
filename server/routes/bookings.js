/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

/*Get booking list*/
router.get('/', function (req, res, next) {
  Booking.find().populate('bookingRoom').exec((err, bookings) => {
    if (err) return res.json(err);
    res.json(bookings);
  })
});
module.exports = router;
