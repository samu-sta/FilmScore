import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../public/styles/App.css';
import NotFound from './pages/NotFound.jsx';
import Home from './pages/Home.jsx';
import MovieDetails from './components/ContentDetails.jsx';
import Index from './pages/Index.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ProfileDetails from './pages/ProfileDetails.jsx';
import ChangePassword from './pages/ChangePassword.jsx';
const App = () => {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch('http://localhost:4000/api/movies');
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }
    fetchMovies();
  }
    , []);

  return (
    <Router className="app-router">
      <>
        <header className='header-app'>
          <Link to="/home" className="header-title">FilmScore</Link>
        </header>

        <Routes>
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/profile" element={<ProfileDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home movies={movies}/>} />
          <Route path="/movie/:movieId" element={<MovieDetails movies={movies}/>} />
          <Route path="*" element={<NotFound />} />
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
