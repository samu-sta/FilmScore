import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { COOKIE_NAME, CLIENT_URLS } from '../../../constants/constants.js';
import { activities } from '../services/activities.js';
import './styles/Home.css';

const Home = ({movies, setLastActivities}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie = `${COOKIE_NAME}=; Expires=Thu, 01 Jan 1970 00:00:00 UTC; Path=/;`;
    setLastActivities([]);
    localStorage.removeItem('lastActivities');
    navigate(CLIENT_URLS.LOGIN);
  }

  

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <main className='home-main'>
      {document.cookie.includes(COOKIE_NAME) ? (
        <header className='header-home'>
          <button
            className='header-home-button'
            onClick={handleLogout}>
            Log Out
          </button>
          <Link to={CLIENT_URLS.PROFILE} className="header-home-button">Profile</Link>
          <Link to={CLIENT_URLS.CHANGE_PASSWORD} className="header-home-button">Change Password</Link>
        </header>

      )
        : (
          <header className='header-home'>
            <Link to={CLIENT_URLS.LOGIN} className="header-home-button">Log In</Link>
            <Link to={CLIENT_URLS.REGISTER} className="header-home-button">Sign Up</Link>
          </header>
        )
    }
      <input className='input-search' type='text' placeholder='Search' onChange={(event) => setSearchTerm(event.target.value)} />
      <ul className='movies-grid'>
        {filteredMovies.map((movie) => (
          <li className="movie-item-li" key={movie.id}>
            <Link className="movie-item" to={`/movie/${movie.id}`}>
              <img
                className='movie-poster'
                src={movie.poster}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
              <p>{movie.year}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;