import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Review from './Review.jsx';
import './styles/ContentDetails.css';
import NotFound from '../pages/NotFound.jsx';
import AddReview from './AddReview.jsx';
import DetailsInfoItem from './DetailsInfoItem.jsx';
import { COOKIE_NAME, CLIENT_URLS } from '../../../constants/constants.js';
import { reviewService } from '../services/ReviewService.js';
import { API_URLS, BASE_URL } from '../../../constants/constants.js';

const ContentDetails = ({movies}) => {
  const { id } = useParams();
  const [userId, setUserId] = useState(null);
  console.log(movies);
  const movie = movies.find(m => m.id == id);

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    async function fetchUserId() {
      try {
        const response = await fetch(`${BASE_URL}${API_URLS.EMAIL}`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        setUserId(data.id);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    }
    fetchUserId();
  }, [id]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const data = await reviewService.fetchReviews(id);
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }
    fetchReviews();
  }, [id]);

  console.log(reviews);


  if (!movie) {
    return <NotFound />;
  }

  return (
    <section className="content-details">
      <header className='content-details-header'>
        <Link to={CLIENT_URLS.HOME} className="back-link">← Back Home</Link>
        <h1 className='content-details-title'>{movie.title}</h1>
      </header>
      <main className='content-details-main'>
        <section className='content-details-section-img'>
          <img className="content-details-img" src={movie.poster} alt={movie.title} />
        </section>
        <aside className='content-details-aside'>
          <section className="details-info">
            <DetailsInfoItem title="Genre" content={movie.genre} />
            <DetailsInfoItem title="Director" content={movie.director} />
            <DetailsInfoItem title="Year" content={movie.year} />
            <DetailsInfoItem title="Duration" content={`${movie.duration} min`} />
            <DetailsInfoItem title="Rating" content={movie.rate} />
          </section>
          <section className="content-description">
            <p>{movie.description}</p>
          </section>
        </aside>
      </main>
      <section className="content-details-reviews">
        <h2 className='reviews-title'>Reviews</h2>
        <ul className='reviews-list'>
          {document.cookie.includes(COOKIE_NAME) && (
          <li className="reviews-list-item">
            <AddReview content_id={id} />
          </li>
          )}
          {reviews && reviews.length > 0 && (
            reviews.map((review, index) => (
              <li className="reviews-list-item" key={index}>
                <Review 
                  review={review} 
                  ownReview={review.user_id === userId && document.cookie.includes(COOKIE_NAME)}  
                  deleteReview={reviewService.deleteReview} 
                />
              </li>
            ))
          )}
        </ul>
      </section>
    </section>
  );
};

export default ContentDetails;