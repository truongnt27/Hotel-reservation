/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const Room = require('../models/room');
const xlsx = require('xlsx');

/* View all rooms*/
router.get('/', function (req, res, next) {
  const pageSize = parseInt((req.query.pageSize > 0) ? req.query.pageSize : 1);
  const pageIndex = (req.query.pageIndex > 0) ? req.query.pageIndex : 1;
  const skipDoc = (pageIndex - 1) * pageSize;

  const type = req.query.type ? req.query.type : '';
  const sortBy = req.query.sortBy ? req.query.sortBy : '';
  const price = (req.query.price > 0) ? parseInt(req.query.price) : 0;
  const filter = {};
  if (type) filter.type = type;
  if (price) filter.price = { $lt: price + 1 };
  Room.find(filter, (err, docs) => {
    if (err) return res.json(err);
    const totalRoom = docs.length;
    Room.find(filter, null, { sort: sortBy, limit: pageSize, skip: skipDoc }, function (err, roomChunks) {
      if (err) {
        res.json(err);
      }
      res.json({ roomChunks, totalRoom });
    });
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


/*export excel rooms*/
router.get('/exportExcel', function (req, res, next) {
  Room.find((err, rooms) => {
    if (err) return err;
    const clearedArr = rooms.map(({ name, price, type, capacity, size, id, pets, breakfast }) => {
      return { id, name, type, price, size, capacity, pets, breakfast };
    });
    const wb = xlsx.utils.book_new();
    const date = new Date().toLocaleString();
    const title = [
      ['List of room in hotel'],
      [date]
    ];
    const ws = xlsx.utils.aoa_to_sheet(title, { origin: 'A2' });
    xlsx.utils.sheet_add_json(ws, clearedArr, { origin: 'A5' });
    ws['!merges'] = [xlsx.utils.decode_range('A2:H2'), xlsx.utils.decode_range('A3:C3')];
    wb.Props = {
      Title: 'List of rooms',
      Subject: 'List of rooms'
    }
    wb.SheetNames.push('RoomList');
    const wscols = [
      { wch: 12 },
      { wch: 20 },
      { wch: 12 },
      { wch: 12 },
      { wch: 12 },
      { wch: 12 },
      { wch: 12 },
      { wch: 12 }
    ]
    ws['!cols'] = wscols;
    wb.Sheets['RoomList'] = ws;
    const filename = `./excels/${Date.now()}_room_list.xlsx`;
    xlsx.writeFile(wb, filename);
    res.download(filename);
  })
})
module.exports = router;
