var mongoose = require('mongoose');

var DocumentSchema = new mongoose.Schema({
  type: String,
  title: String,
  author: String,
  status: String,
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});
module.exports = mongoose.model('Document', DocumentSchema);
