const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const { Schema } = mongoose;

const postSchema = new Schema({
  thread_id: { type: ObjectId, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', postSchema);
