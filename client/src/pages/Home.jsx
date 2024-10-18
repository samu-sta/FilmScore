import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './styles/Home.css';

const Home = ({movies}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie = 'jwt=; Expires=Thu, 01 Jan 1970 00:00:00 UTC; Path=/;';
    navigate('/login');
  }

  

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <main className='home-main'>
      {document.cookie.includes('jwt') ? (
        <header className='header-home'>
          <button
            className='header-home-button'
            onClick={handleLogout}>
            Log Out
          </button>
          <Link to="/profile" className="header-home-button">Profile</Link>
          <Link to="/changePassword" className="header-home-button">Change Password</Link>
        </header>

      )
        : (
          <header className='header-home'>
            <Link to="/login" className="header-home-button">Log In</Link>
            <Link to="/register" className="header-home-button">Sign Up</Link>
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