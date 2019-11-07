/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const Room = require('../models/room');

/* View all rooms*/
router.get('/', function (req, res, next) {
  Room.find(function (err, docs) {
    if (err) {
      res.json(err);
    }
    const roomChunks = [];
    const chunkSize = 6;
    for (let i = 0; i < docs.length; i += chunkSize) {
      roomChunks.push(docs.slice(i, i + chunkSize));
    }
    res.json(roomChunks)
  });
});

/*View detail a room*/
router.post('/viewDetailRoom', function (req, res, next) {
  const roomId = req.body.roomId;
  if (!req.body.roomId) return next();
  Room.findOne({ id: roomId }, (err, room) => {
    if (err) return res.json(err);
    res.json(room);
  })
});

/*Add a room*/
router.post('/addRoom', function (req, res, next) {
  if (!req.body.room) return next();
  Room.findOne().sort({ _id: -1 }).exec((err, latestRoom) => {
    if (err) {
      res.json(err)
    }
    // Compute room id
    const id = (parseInt(latestRoom.id) + 1).toString().padStart(4, '0');
    const room = new Room({ ...req.body.room, id: id });
    room.save((err, doc) => {
      if (err) {
        return res.json(err)
      }
      res.end(doc.id);
    })
  })
});

/*Update a room*/
router.post('/updateRoom', function (req, res, next) {
  console.log(req.body);
  Room.findOneAndUpdate({ id: req.body.id }, req.body.updateVal, { runValidators: true }, (err, doc) => {
    if (err) {
      return res.json(err)
    }
    res.json(doc.id)
  });
});

/*Delete a room*/
router.post('/deleteRoom', function (req, res, next) {
  const id = req.body.roomId;
  Room.deleteOne({ id: id }, (err) => {
    if (err)
      console.log(err);

    return res.json(id);
  })
});

module.exports = router;
