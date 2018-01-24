var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eSchema = new Schema({
  author: String,
  quote:String,
  rate:Number,
  id:String
});

var edit = mongoose.model('Edited', eSchema);

// make this available to our users in our Node applications
module.exports = edit;
