import React, {useState} from 'react';
import './styles/Review.css';
import { RiDeleteBin6Line } from "react-icons/ri";

const Review = ({ review, isOwnReview, deleteReview, setAddedReview, setReviews, reviews }) => {
  
  const [isVisible, setIsVisible] = useState(true);

  const handleDelete = () => {
    deleteReview(review.userFk, review.contentFk);
    setAddedReview(false);
    setReviews(reviews.filter(
      rev => rev.userFk !== review.userFk && rev.contentFk !== review.contentFk));
    setIsVisible(false);

  }
  
  return (
    isVisible &&
    <article className="review">
      <main className='review-main'>
        <h2 className='review-author'>{review.author}</h2>
        <p className='review-content'>{review.content}</p>
        <p className='review-rating'>Rating: {review.rate}</p>
      </main>
      <aside className='review-aside'>
        {isOwnReview && (
          <button 
            className='review-delete'
            onClick={handleDelete}
          ><RiDeleteBin6Line /></button>
        )}
      </aside>
      
    </article>
  );
};

export default Review;
