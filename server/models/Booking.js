const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  contactInfo: {
    phone: { type: String, required: true },
    address: { type: String }, // optional
    email: { type: String }    // Added email here as you send it from frontend
  },
  status: { type: String, default: 'Pending' }, // Pending, Confirmed, Cancelled etc.
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
