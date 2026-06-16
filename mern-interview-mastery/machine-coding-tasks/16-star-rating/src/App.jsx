import { useState } from 'react';
import './App.css';

// Reusable Star Rating Component
function StarRating({ totalStars = 5, rating, onChange, readOnly = false, size = '32px' }) {
  const [hoveredRating, setHoveredRating] = useState(null);

  const handleMouseEnter = (idx) => {
    if (readOnly) return;
    setHoveredRating(idx);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoveredRating(null);
  };

  const handleClick = (idx) => {
    if (readOnly) return;
    if (onChange) onChange(idx);
  };

  // Determine active color style
  const isStarActive = (starIdx) => {
    const threshold = hoveredRating !== null ? hoveredRating : rating;
    return starIdx <= threshold;
  };

  return (
    <div className={`star-rating-widget ${readOnly ? 'read-only' : ''}`} style={{ '--star-size': size }}>
      {Array.from({ length: totalStars }, (_, idx) => {
        const starValue = idx + 1;
        return (
          <button
            key={starValue}
            type="button"
            className={`star-btn ${isStarActive(starValue) ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starValue)}
            disabled={readOnly}
            aria-label={`Rate ${starValue} stars out of ${totalStars}`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}

function App() {
  const [userScore, setUserScore] = useState(3);
  const [feedbackList, setFeedbackList] = useState([
    { id: 1, user: 'Sophia Lin', score: 5, comment: 'Exceptional Fiber architectural guidelines! Very direct code representation.' },
    { id: 2, user: 'Devon Vance', score: 4, comment: 'Strong JWT flow descriptions. Saved hours in token refresh setups.' }
  ]);
  const [commentInput, setCommentInput] = useState('');

  const scoreLabels = {
    1: '😢 Poor (1/5)',
    2: '😐 Satisfactory (2/5)',
    3: '⚡ Good (3/5)',
    4: '🔥 Very Good (4/5)',
    5: '🏆 Exceptional (5/5)'
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const newReview = {
      id: Date.now(),
      user: 'Anonymous Developer',
      score: userScore,
      comment: commentInput.trim()
    };

    setFeedbackList([newReview, ...feedbackList]);
    setCommentInput('');
    setUserScore(3); // Reset rating to default
  };

  return (
    <div className="rating-page-container">
      <header className="rating-page-header">
        <div className="brand">
          <span className="logo-icon">⭐</span>
          <div>
            <h1>RankSphere</h1>
            <p className="subtitle">MERN Level - Generic Reusable Star Reviewers, Pointer Hover Bounds & Array Map Renders</p>
          </div>
        </div>
      </header>

      <div className="rating-grid">
        {/* Left Pane: reviewer controller input */}
        <aside className="rating-input-pane card">
          <h2>Submit Review</h2>
          <form onSubmit={handleAddReview} className="review-form">
            <div className="form-group">
              <label>Select Rating score</label>
              <div className="star-selector-row">
                <StarRating 
                  rating={userScore} 
                  onChange={setUserScore} 
                  size="40px"
                />
                <span className="score-desc-tag">{scoreLabels[userScore] || 'Select stars'}</span>
              </div>
            </div>

            <div className="form-group">
              <label>Feedback Comment</label>
              <textarea
                placeholder="Share your technical experience using the MERN guides..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                rows="4"
                required
              />
            </div>

            <div className="form-action-row">
              <button type="submit" className="btn btn-primary">Publish Review</button>
              <button type="button" className="btn btn-secondary" onClick={() => setUserScore(0)}>Reset Stars</button>
            </div>
          </form>
        </aside>

        {/* Right Pane: list of reviews */}
        <main className="rating-feed-pane card">
          <h2>Peer Reviews</h2>
          <div className="feedback-list">
            {feedbackList.map(review => (
              <div key={review.id} className="feedback-item">
                <div className="feedback-meta">
                  <strong>{review.user}</strong>
                  <StarRating 
                    rating={review.score} 
                    readOnly={true} 
                    size="16px"
                  />
                </div>
                <p className="feedback-comment">{review.comment}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
