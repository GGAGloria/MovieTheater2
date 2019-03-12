const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
  SeatNo: String,
  BroadcastId: Number,
  Valid: String, 
  UserId: String, 
  TicketType: String, 
  TicketFee: String
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Ticket', schema);