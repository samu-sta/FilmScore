import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Review from '../components/Review.jsx';
import './styles/ContentDetails.css';
import NotFound from './NotFound.jsx';
import AddReview from '../components/AddReview.jsx';
import DetailsInfoItem from '../components/DetailsInfoItem.jsx';
import { COOKIE_NAME, CLIENT_URLS } from '../../../constants/constants.js';
import { reviewService } from '../services/ReviewService.js';
import { API_URLS, BASE_URL } from '../../../constants/constants.js';
import { getUserId } from '../services/UserService.js';
import { fetchReviews } from '../services/ReviewService.js';

const ContentDetails = ({movies, setLastActivities}) => {
  const { id } = useParams();
  const [userId, setUserId] = useState(null);
  const [addedReview, setAddedReview] = useState(false);
  const movie = movies.find(m => m.id == id);

  useEffect(() => {
    setAddedReview(
      ! reviews.every(review => review.userFk !== userId)
    );
  });

  const [reviews, setReviews] = useState([]);
  console.log(reviews);


  useEffect(() => {
    async function fetchUserId() {
      try {
        const response = await getUserId();
        setUserId(response.email);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    }
    if (document.cookie.includes(COOKIE_NAME)) {
      fetchUserId();
    }
    
  }, []);

  useEffect(() => {
    async function fetchAllReviews() {
      try {
        const data = await fetchReviews(id);
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }
    fetchAllReviews();
  }, [id]);

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
          {! addedReview && document.cookie.includes(COOKIE_NAME) && (
          <li className="reviews-list-item">
            <AddReview content_id={id} setAddedReview={setAddedReview} setLastActivities={setLastActivities} />
          </li>
          )}
          {reviews && reviews.length > 0 && (
            reviews.map((review, index) => (
              <li className="reviews-list-item" key={index}>
                <Review 
                  review={review} 
                  isOwnReview={review.userFk === userId && document.cookie.includes(COOKIE_NAME)}  
                  setAddedReview={setAddedReview}
                  deleteReview={reviewService.deleteReview}
                  setReviews={setReviews}
                  reviews={reviews}


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