import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Review from './Review.jsx';
import '../../public/styles/components/ContentDetails.css';
import NotFound from '../pages/NotFound.jsx';
import AddReview from './AddReview.jsx';
import DetailsInfoItem from './DetailsInfoItem.jsx';

const ContentDetails = ({movies}) => {
  const { movieId } = useParams();
  //pasar por parametro las movies
  const movie = movies.find(m => m.id === movieId);

  if (!movie) {
    return <NotFound />;
  }

  return (
    <section className="content-details">
      <header className='content-details-header'>
        <Link to="/home" className="back-link">← Back Home</Link>
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
          <li className="reviews-list-item">
            <AddReview />
          </li>
          {movie.reviews && movie.reviews.length > 0 && (
            movie.reviews.map((review, index) => (
              <li className="reviews-list-item" key={index}>
                <Review review={review} />
              </li>
            ))
          )}
        </ul>
      </section>
    </section>
  );
};

export default ContentDetails;