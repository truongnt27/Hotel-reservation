
const mongoose = require('mongoose');
const Booking = require('../models/booking');

mongoose.connect('mongodb://localhost/hotel-reservation', { useNewUrlParser: true });

const rooms = [
  new Booking({
    name: 'Ekaterina Tankova',
    email: 'ekaterina.tankova@devias.io',
    phone: '0962127448',
    bookedRooms: [new mongoose.Types.ObjectId('5dcae1d352998613743e0c42')],
    checkInDate: 1555016400000,
    checkOutDate: 1555016960000,
    createdAt: 1555016400000,
    totalAmount: 115,
  }),
  new Booking({
    name: 'Cao Yu',
    email: 'cao.yu@devias.io',
    phone: '0126966996',
    bookedRooms: [new mongoose.Types.ObjectId('5dcae1d352998613743e0c43')],
    checkInDate: 1555016400000,
    checkOutDate: 1555016960000,
    createdAt: 1555016400000,
    totalAmount: 100
  }),

]

var done = 0;
for (var i = 0; i < rooms.length; i++) {
  rooms[i].save(function (err, result) {
    done++;
    if (done === rooms.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
