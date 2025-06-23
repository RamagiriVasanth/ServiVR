const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },           // Optional: Add description
  price: { type: Number, default: 0 },     // Optional: Add price field
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
