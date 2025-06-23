import React, { useState } from 'react';
import './Review.css';

function Review() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      setMessage('Please select a rating before submitting.');
      return;
    }
    // Simulate submit
    setMessage('🙏 Thank you for using this demo app!');
    setRating(0);
    setHoverRating(0);
    setComment('');
  };

  return (
    <div className="review-page">
      <h2>Leave a Review</h2>

      <form onSubmit={handleSubmit} className="review-form">
        <label htmlFor="rating">Rating:</label>
        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className={`star ${star <= (hoverRating || rating) ? 'selected' : ''}`}
              role="button"
              tabIndex={0}
              aria-label={`${star} star`}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setRating(star);
              }}
            >
              ★
            </span>
          ))}
        </div>

        <label htmlFor="comment">Your Review (optional):</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
        />

        <button type="submit" className="submit-button">Submit Review</button>
      </form>

      {message && <p className="review-message">{message}</p>}
    </div>
  );
}

export default Review;
