import React, { useState } from 'react';
import './styles/AddReview.css';
import { reviewService } from '../services/ReviewService.js';
import { set } from 'zod';

const AddReview = ({content_id}) => {

  const [rating, setRating] = useState('');
  const [content, setContent] = useState('');

  const [isFormVisible, setIsFormVisible] = useState(false);
  const handleRatingChange = (event) => {
    let value = parseInt(event.target.value);

    if (isNaN(value) || value < 0) {
      value = 0;
    } else if (value > 10) {
      value = 10;
    }
    setRating(value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const review = {
      rate: rating,
      content: content,
      contentFk: content_id
    };
    setRating('');
    setContent('');
    reviewService.createReview(review);
    setIsFormVisible(false);
    window.location.reload();
  };

  return (
    <>
      {isFormVisible ?
        <article className="addreview">
          <h2 className='addreview-title'>Add your Review</h2>
          <textarea onChange={handleContentChange} placeholder="Write here" className='addreview-textarea' />
          <footer className='addreview-footer'>
            <section className='addreview-rating'>
              <label htmlFor="rating">Rating: </label>
              <input onChange={handleRatingChange} value={rating} type="number" className='addreview-input-rate' />
            </section>
            <button onClick={handleSubmit} className='addreview-button'>Submit</button>
          </footer>

        </article>
        : <button onClick={() => setIsFormVisible(true)} className='addreview-button-add'>+ Add Review</button>
      }
    </>
  );
};

export default AddReview;