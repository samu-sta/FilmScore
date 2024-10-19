import React from 'react';
import { Link } from 'react-router-dom';
import { CLIENT_URLS } from '../../../constants/constants.js';
import './styles/NotFound.css';
const NotFound = () => {
  return (
    <article className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link className="notfound-gohome-button" to={CLIENT_URLS.HOME}>Go to Home</Link>
    </article>
  );
};

export default NotFound;