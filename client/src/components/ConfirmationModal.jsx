import React from 'react';
import './styles/ConfirmationModal.css';

const ConfirmationModal = ({ title, message, show, onClose, onConfirm }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <article className="modal-content">
                <h2>{title}</h2>
                <p>{message}</p>
                <section className="modal-buttons">
                    <button 
                    onClick={onConfirm}
                    className='modal-button modal-button-yes'
                    >Yes</button>
                    <button 
                    className='modal-button'
                    onClick={onClose}>No</button>
                </section>
            </article>
        </div>
    );
};

export default ConfirmationModal;