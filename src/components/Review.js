import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import './Review.css';

// Set up Axios instance with the base URL
const api = axios.create({
  baseURL: 'http://127.0.0.1:5000'
});

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [artists, setArtists] = useState([]);
  const [newReview, setNewReview] = useState({
    name: '',
    artist_id: '',
    rating: 0,
    feedback: ''
  });

  useEffect(() => {
    // Fetch initial data
    fetchReviews();
    fetchArtists();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await api.get('/reviews');
      console.log('Fetched reviews:', response.data);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const fetchArtists = async () => {
    try {
      const response = await api.get('/artists');
      console.log('Fetched artists:', response.data);
      setArtists(response.data);
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  };

  const getArtistById = (id) => artists.find(artist => artist.id === id);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar key={index} color={index < rating ? '#ffc107' : '#e4e5e9'} />
    ));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting review:', newReview);
    try {
      const response = await api.post('/reviews', newReview);
      console.log('Added review:', response.data);
      
      // Add new review to state without waiting for a re-fetch
      setReviews((prevReviews) => [...prevReviews, response.data]);

      // Reset form
      setNewReview({
        name: '',
        artist_id: '',
        rating: 0,
        feedback: ''
      });
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <div className="review-container">
      <h2>Reviews</h2>
      <form onSubmit={handleSubmit} className="review-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newReview.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
          />
        </label>
        <label>
          Artist:
          <select name="artist_id" value={newReview.artist_id} onChange={handleInputChange}>
            <option value="">Select Artist</option>
            {artists.map(artist => (
              <option key={artist.id} value={artist.id}>
                {artist.first_name} {artist.last_name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Rating:
          <div className="stars">
            {Array.from({ length: 5 }, (_, index) => (
              <FaStar
                key={index}
                color={index < newReview.rating ? '#ffc107' : '#e4e5e9'}
                onClick={() => handleRatingChange(index + 1)}
              />
            ))}
          </div>
        </label>
        <label>
          Feedback:
          <textarea
            name="feedback"
            value={newReview.feedback}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Add Review</button>
      </form>
      <div className="review-cards">
        {reviews.map(review => {
          const artist = getArtistById(review.artist_id);

          return (
            <div className="review-card" key={review.id}>
              <div className="rating">
                <h3>Rating: {review.rating}</h3>
                <div className="stars">{renderStars(review.rating)}</div>
              </div>
              <p><strong>Feedback:</strong> {review.feedback}</p>
              <p><strong>Reviewer:</strong> {review.name}</p>
              <p><strong>Artist:</strong> {artist ? ${artist.first_name} ${artist.last_name} : 'Loading...'}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Reviews;