import React, { useEffect } from 'react';
import './styles/Auth.css';
import { COOKIE_NAME, API_URLS, BASE_URL, CLIENT_URLS, ERROR_MESSAGES } from '../../../constants/constants.js'

import { Link, useNavigate } from 'react-router-dom';
const Register = () => {

  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}${API_URLS.REGISTER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: event.target.email.value,
          password: event.target.password.value,
          login: event.target.login.value,
          lastName: event.target.lastName.value,
          firstName: event.target.firstName.value,
          birthYear: Number(event.target.birthYear.value),
        }),
      });

      if (!res.ok) {
        setError(true);
        return;
      }
      setError(false);

      const data = await res.json();
      navigate(CLIENT_URLS.LOGIN);
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
      <h1 className="auth-title">Sign Up to FilmScore</h1>
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
          <article className="form-group">
            <label htmlFor="login">Login</label>
            <input type="text" id="login" name="login" required />
          </article>
          <article className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" required />
          </article>
          <article className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" required />
          </article>
          <article className="form-group">
            <label htmlFor="birthYear">Year of Birth</label>
            <input type="number" id="birthYear" name="birthYear" required />
          </article>
          <button type="submit" className="primary-button">Sign Up</button>
          <p className={`${error ? 'error-message' : 'hidden'}`}>Email is already in use</p>
          <p className='auth-link-text'>Already have an account? <Link className='auth-link' to={CLIENT_URLS.LOGIN}>Log in</Link></p>
        </form>

      </main>

    </main>
  );
};

export default Register;