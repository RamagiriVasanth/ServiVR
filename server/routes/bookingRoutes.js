const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// POST /api/bookings - create a new booking
router.post('/', async (req, res) => {
  const { user, service, contactInfo } = req.body;

  console.log('Booking POST body:', req.body); // for debugging

  if (!user || !service || !contactInfo?.phone) {
    return res.status(400).json({ msg: 'User, service, and phone are required' });
  }

  try {
    const newBooking = new Booking({
      user,
      service,
      contactInfo: {
        phone: contactInfo.phone,
        email: contactInfo.email || '',
        address: contactInfo.address || '',
      },
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    console.error('Error saving booking:', err);
    res.status(500).json({ msg: 'Server error saving booking' });
  }
});

module.exports = router;
