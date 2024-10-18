import './styles/Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { COOKIE_NAME } from '../../../constants/constants.js';
const Login = () => {

  const navigate = useNavigate();
  const  [error, setError] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: event.target.email.value,
        password: event.target.password.value,
      }),
      credentials: 'include',
    });

    if ( ! res.ok) {
      setError(true);
      return;
    }
    setError(false);
    
    await res.json();
    const cookies = res.headers.get('set-cookie');
    if (cookies) {
    } 
    else {
    }
    navigate('/home');
  };

  useEffect(() => {
    if (document.cookie.includes(COOKIE_NAME)) {
      navigate('/home');
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
          <Link className='auth-link'to='/register'>Sign Up</Link>
        </form>
      </main>
    </main>
  );
};

export default Login;