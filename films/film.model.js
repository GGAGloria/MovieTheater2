const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
  FilmName: String,
  Duration: String,
  Category: String,
  Language: String,
  Director: String,
  BroadcastId: Number,
  Dates: String,
  Time: String,
  day: String,
  HouseID: String,
  HouseRow: String,
  HouseCol: String
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Film', schema);