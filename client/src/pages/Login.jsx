import './styles/Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { COOKIE_NAME, API_URLS, BASE_URL, CLIENT_URLS, ERROR_MESSAGES } from '../../../constants/constants.js';
import { activities } from '../services/activities.js';
import { loginUser } from '../services/UserService.js';
const Login = ({setLastActivities}) => {

  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    try {
      const res = await loginUser(data);

      if (res.error) {
        setError(true);
        return;
      }
      setError(false);

      setLastActivities(
        (prevActivities) => {
          const updatedActivities =  [...prevActivities, new activities.LoggedIn(new Date())];
          localStorage.setItem('lastActivities', JSON.stringify(updatedActivities));
          return updatedActivities;
        }
      );

      navigate(CLIENT_URLS.HOME);
    } catch (error) {
      console.error(ERROR_MESSAGES.FETCH_ERROR, error);
    } 

  };

  useEffect(() => {
    if (document.cookie.includes(COOKIE_NAME)) {
      navigate(CLIENT_URLS.HOME);
    }
  }
    , []);

  return (
    <main className="auth-main">
      <h1 className="auth-title">Log in to FilmScore</h1>
      <main className='auth-main'>
        <form className="auth-form" onSubmit={handleSubmit}>
          <article className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </article>
          <article className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </article>
          <button type="submit" className="primary-button">Log in</button>
          <p className={`${error ? 'error-message' : 'hidden'}`}>Email or password is incorrect</p>
          <p className='auth-link-text'>Don't have an account? </p>
          <Link className='auth-link' to='/register'>Sign Up</Link>
        </form>
      </main>
    </main>
  );
};

export default Login;