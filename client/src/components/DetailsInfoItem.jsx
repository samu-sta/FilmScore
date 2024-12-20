import React from 'react';
import './styles/DetailsInfoItem.css';


const DetailsInfoItem = ({ title, content }) => {
  return (
    <article className='details-info-item'>
      <h3>{title}</h3>
      <p>{content}</p>
    </article>
  );
};

export default DetailsInfoItem;