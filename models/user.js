const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  date_reg: { type: Date, default: Date.now },
  last_log: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
