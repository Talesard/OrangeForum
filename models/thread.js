const mongoose = require('mongoose');

const { Schema } = mongoose;

const threadSchema = new Schema({
  board: { type: String, required: true },
  title: { type: String, required: true },
  first_post_text: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Thread', threadSchema);
