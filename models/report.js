const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const { Schema } = mongoose;

const reportSchema = new Schema({
  thread_id: { type: ObjectId, required: true },
  post_id: { type: ObjectId, required: true },
  date: { type: Date, default: Date.now },
  reason: { type: String, required: true },
});

module.exports = mongoose.model('Report', reportSchema);
