import React, { useState } from 'react';
import '../../public/styles/components/AddReview.css';

const AddReview = () => {

    const [rating, setRating] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const handleRatingChange = (event) => {
        let value = parseInt(event.target.value);

        // Limitar el valor a estar entre 0 y 10
        if (isNaN(value) || value < 0) {
            value = 0;
        } else if (value > 10) {
            value = 10;
        }

        // Establecer el valor entero en el estado
        setRating(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsFormVisible(false);
    };

    return (
        <>
            {isFormVisible ?
                <article className="addreview">
                    <h2 className='addreview-title'>Add your Review</h2>
                    <textarea placeholder="Write here" className='addreview-textarea' />
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