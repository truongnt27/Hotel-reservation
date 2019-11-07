/* eslint-disable no-undef */

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const roomsRouter = require('./routes/rooms');
const usersRouter = require('./routes/users');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb://localhost/hotel-reservation', { useNewUrlParser: true });


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use('/rooms', roomsRouter);
app.use('/users', usersRouter);

module.exports = app;
