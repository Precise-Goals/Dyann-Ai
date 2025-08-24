import React, { useState, useEffect } from 'react';
import { Star, Plus, Edit, Trash2, User, Calendar, MessageCircle } from 'lucide-react';
import './Reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [formData, setFormData] = useState({
    customerName: '',
    rating: 5,
    category: 'General',
    feedback: '',
    product: ''
  });

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = () => {
    // Mock data - in real app, this would come from your database
    const mockReviews = [
      {
        id: 1,
        customerName: 'John Smith',
        rating: 5,
        category: 'Electronics',
        feedback: 'Excellent product quality and fast delivery. The customer service team was very helpful.',
        product: 'Smartphone X1',
        timestamp: new Date('2024-01-15'),
        sentiment: 'positive'
      },
      {
        id: 2,
        customerName: 'Sarah Johnson',
        rating: 4,
        category: 'Clothing',
        feedback: 'Great fit and comfortable material. Would recommend to friends and family.',
        product: 'Premium T-Shirt',
        timestamp: new Date('2024-01-14'),
        sentiment: 'positive'
      },
      {
        id: 3,
        customerName: 'Mike Davis',
        rating: 3,
        category: 'Home & Garden',
        feedback: 'Product arrived on time but quality could be better. Average experience overall.',
        product: 'Garden Tool Set',
        timestamp: new Date('2024-01-13'),
        sentiment: 'neutral'
      },
      {
        id: 4,
        customerName: 'Emily Wilson',
        rating: 5,
        category: 'Sports',
        feedback: 'Amazing quality! This exceeded my expectations. Will definitely buy again.',
        product: 'Running Shoes Pro',
        timestamp: new Date('2024-01-12'),
        sentiment: 'positive'
      },
      {
        id: 5,
        customerName: 'David Brown',
        rating: 2,
        category: 'Electronics',
        feedback: 'Product stopped working after a week. Customer service was unhelpful.',
        product: 'Wireless Headphones',
        timestamp: new Date('2024-01-11'),
        sentiment: 'negative'
      }
    ];

    setReviews(mockReviews);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating: rating
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingReview) {
      // Update existing review
      setReviews(prev => prev.map(review => 
        review.id === editingReview.id 
          ? { ...formData, id: review.id, timestamp: new Date() }
          : review
      ));
      setEditingReview(null);
    } else {
      // Add new review
      const newReview = {
        id: Date.now(),
        ...formData,
        timestamp: new Date(),
        sentiment: getSentiment(formData.rating)
      };
      setReviews(prev => [newReview, ...prev]);
    }

    // Reset form
    setFormData({
      customerName: '',
      rating: 5,
      category: 'General',
      feedback: '',
      product: ''
    });
    setShowForm(false);
  };

  const getSentiment = (rating) => {
    if (rating >= 4) return 'positive';
    if (rating >= 3) return 'neutral';
    return 'negative';
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setFormData({
      customerName: review.customerName,
      rating: review.rating,
      category: review.category,
      feedback: review.feedback,
      product: review.product
    });
    setShowForm(true);
  };

  const handleDelete = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(prev => prev.filter(review => review.id !== reviewId));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingReview(null);
    setFormData({
      customerName: '',
      rating: 5,
      category: 'General',
      feedback: '',
      product: ''
    });
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? 'star-filled' : 'star-empty'}
      />
    ));
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return '#10B981';
      case 'neutral': return '#F59E0B';
      case 'negative': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getSentimentLabel = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'Positive';
      case 'neutral': return 'Neutral';
      case 'negative': return 'Negative';
      default: return 'Unknown';
    }
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="reviews">
      <div className="reviews-container">
        <div className="reviews-header">
          <h1>Customer Reviews</h1>
          <p>Manage and analyze customer feedback to improve your business</p>
        </div>

        {/* Reviews Summary */}
        <div className="reviews-summary">
          <div className="summary-card">
            <h3>Overall Rating</h3>
            <div className="rating-display">
              <span className="rating-number">{averageRating}</span>
              <div className="rating-stars">
                {getRatingStars(Math.round(averageRating))}
              </div>
            </div>
            <p>Based on {reviews.length} reviews</p>
          </div>

          <div className="summary-card">
            <h3>Total Reviews</h3>
            <span className="summary-number">{reviews.length}</span>
            <p>Customer feedback collected</p>
          </div>

          <div className="summary-card">
            <h3>Sentiment Analysis</h3>
            <div className="sentiment-breakdown">
              {['positive', 'neutral', 'negative'].map(sentiment => {
                const count = reviews.filter(r => r.sentiment === sentiment).length;
                const percentage = reviews.length > 0 ? ((count / reviews.length) * 100).toFixed(0) : 0;
                return (
                  <div key={sentiment} className="sentiment-item">
                    <span 
                      className="sentiment-dot" 
                      style={{ backgroundColor: getSentimentColor(sentiment) }}
                    ></span>
                    <span>{getSentimentLabel(sentiment)}: {percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Add Review Button */}
        <div className="add-review-section">
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            <Plus size={20} />
            Add New Review
          </button>
        </div>

        {/* Review Form */}
        {showForm && (
          <div className="review-form-container">
            <div className="review-form">
              <h3>{editingReview ? 'Edit Review' : 'Add New Review'}</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Customer Name</label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Product</label>
                    <input
                      type="text"
                      name="product"
                      value={formData.product}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      <option value="General">General</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Home & Garden">Home & Garden</option>
                      <option value="Sports">Sports</option>
                      <option value="Books">Books</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Rating</label>
                    <div className="rating-input">
                      {[1, 2, 3, 4, 5].map(rating => (
                        <button
                          key={rating}
                          type="button"
                          className={`rating-star ${formData.rating >= rating ? 'selected' : ''}`}
                          onClick={() => handleRatingChange(rating)}
                        >
                          <Star size={20} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Feedback</label>
                  <textarea
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleInputChange}
                    rows="4"
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    {editingReview ? 'Update Review' : 'Add Review'}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Reviews List */}
        <div className="reviews-list">
          <h3>All Reviews</h3>
          {reviews.map(review => (
            <div key={review.id} className={`review-card ${review.sentiment}`}>
              <div className="review-header">
                <div className="review-info">
                  <div className="customer-info">
                    <User size={16} />
                    <span className="customer-name">{review.customerName}</span>
                  </div>
                  <div className="review-meta">
                    <span className="product-name">{review.product}</span>
                    <span className="category-tag">{review.category}</span>
                  </div>
                </div>
                <div className="review-rating">
                  <div className="stars">
                    {getRatingStars(review.rating)}
                  </div>
                  <span className="rating-text">{review.rating}/5</span>
                </div>
              </div>

              <div className="review-content">
                <p>{review.feedback}</p>
              </div>

              <div className="review-footer">
                <div className="review-timestamp">
                  <Calendar size={14} />
                  <span>{review.timestamp.toLocaleDateString()}</span>
                </div>
                <div className="sentiment-badge" style={{ backgroundColor: getSentimentColor(review.sentiment) }}>
                  {getSentimentLabel(review.sentiment)}
                </div>
                <div className="review-actions">
                  <button 
                    className="action-button edit"
                    onClick={() => handleEdit(review)}
                    title="Edit Review"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    className="action-button delete"
                    onClick={() => handleDelete(review.id)}
                    title="Delete Review"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
