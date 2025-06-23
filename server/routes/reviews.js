const express = require('express');
const router = express.Router();
const Review = require('../models/Review'); // We'll create this model next
const authMiddleware = require('../middleware/authMiddleware'); // Assuming you have auth middleware

// POST /api/reviews - submit a review
router.post('/', authMiddleware, async (req, res) => {
  const { rating, comment } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  try {
    const review = new Review({
      user: req.user.id,  // assuming auth middleware sets req.user
      rating,
      comment,
    });

    await review.save();

    res.status(201).json({ message: 'Review submitted successfully', review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error, please try again.' });
  }
});

module.exports = router;