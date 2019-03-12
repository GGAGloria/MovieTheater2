const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
  UserId: String,
  PW: String,
  FilmName: String,
  Comment: String
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);