import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';
import NotFound from './pages/NotFound.jsx';
import Home from './pages/Home.jsx';
import MovieDetails from './components/ContentDetails.jsx';
import Index from './pages/Index.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ProfileDetails from './pages/ProfileDetails.jsx';
import ChangePassword from './pages/ChangePassword.jsx';
import { BASE_URL, API_URLS, CLIENT_URLS, ERROR_MESSAGES } from '../../constants/constants.js';
const App = () => {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(`${BASE_URL}${API_URLS.MOVIES}`);
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        console.Error(ERROR_MESSAGES.FETCH_ERROR, error);
      }
    }
    fetchMovies();
  }
    , []);

  return (
    <Router className="app-router">
      <>
        <header className='header-app'>
          <Link to={CLIENT_URLS.HOME} className="header-title">FilmScore</Link>
        </header>

        <Routes>
          <Route path={CLIENT_URLS.CHANGE_PASSWORD} element={<ChangePassword />} />
          <Route path={CLIENT_URLS.PROFILE} element={<ProfileDetails />} />
          <Route path={CLIENT_URLS.REGISTER} element={<Register />} />
          <Route path={CLIENT_URLS.INDEX} element={<Index />} />
          <Route path={CLIENT_URLS.LOGIN} element={<Login />} />
          <Route path={CLIENT_URLS.HOME} element={<Home movies={movies}/>} />
          <Route path={CLIENT_URLS.MOVIE} element={<MovieDetails movies={movies}/>} />
          <Route path={CLIENT_URLS.NOT_FOUND} element={<NotFound />} />
        </Routes>
        <footer className="app-footer">
          <div className="footer-content">
            <p>{new Date().getFullYear()} FilmScore. All rights reserved.</p>
            <nav className="footer-nav">
              <Link to="#">About</Link>
              <Link to="#">Contact</Link>
              <Link to="#">Privacy Policy</Link>
            </nav>
          </div>
        </footer>
      </>
    </Router>
  );
};

export default App;
