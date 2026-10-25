const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  price:       { type: Number, required: true },
  duration:    { type: String, default: '' },
  category:    { type: String, default: '' },
  image:       { type: String, default: '' },  // base64 string
  isActive:    { type: Boolean, default: true },
  createdAt:   { type: Date, default: Date.now }
});

module.exports = mongoose.model('Service', ServiceSchema);