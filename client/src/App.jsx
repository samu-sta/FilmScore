import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';
import NotFound from './pages/NotFound.jsx';
import Home from './pages/Home.jsx';
import ContentDetails from './pages/ContentDetails.jsx';
import Index from './pages/Index.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ProfileDetails from './pages/ProfileDetails.jsx';
import ChangePassword from './pages/ChangePassword.jsx';
import { fetchMovies } from './services/ContentService.js';
import { CLIENT_URLS } from '../../constants/constants.js';
  const App = () => {

  const [movies, setMovies] = useState([]);
  const [lastActivities, setLastActivities] = useState(
    localStorage.getItem('lastActivities') ? JSON.parse(localStorage.getItem('lastActivities')) : []);
    
  useEffect(() => {
    fetchMovies().then(data => setMovies(data));
  }
    , []);

  return (
    <Router className="app-router">
      <>
        <header className='header-app'>
          <Link to={CLIENT_URLS.HOME} className="header-title" setLastActivities={setLastActivities}>FilmScore</Link>
        </header>

        <Routes className="app-routes">
          <Route path={CLIENT_URLS.CHANGE_PASSWORD} element={<ChangePassword />} />
          <Route path={CLIENT_URLS.PROFILE} element={<ProfileDetails lastActivities={lastActivities} setLastActivities={setLastActivities} />} />
          <Route path={CLIENT_URLS.REGISTER} element={<Register />} />
          <Route path={CLIENT_URLS.INDEX} element={<Index />} />
          <Route path={CLIENT_URLS.LOGIN} element={<Login setLastActivities={setLastActivities} />} />
          <Route path={CLIENT_URLS.HOME} element={<Home movies={movies} setLastActivities={setLastActivities} />} />
          <Route path={CLIENT_URLS.MOVIE} element={<ContentDetails movies={movies} setLastActivities={setLastActivities} />} />
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
