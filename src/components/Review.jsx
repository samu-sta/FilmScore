import React from 'react';
import '../../public/styles/components/Review.css';


const Review = ({ review }) => {
    return (
        <article className="review">
            <h2 className='review-author'>{review.author}</h2>
            <p className='review-content'>{review.content}</p>
            <p className='review-rating'>Rating: {review.rate}</p>
        </article>
    );
};

export default Review;
