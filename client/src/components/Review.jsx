import React, {useState} from 'react';
import './styles/Review.css';
import { RiDeleteBin6Line } from "react-icons/ri";

const Review = ({ review, ownReview, deleteReview }) => {
  
  const [isVisible, setIsVisible] = useState(true);

  const handleDelete = () => {
    deleteReview(review.id);
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
        {ownReview && (
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
