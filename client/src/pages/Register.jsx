import React, { useEffect } from 'react';
import './styles/Auth.css';

import { Link, useNavigate } from 'react-router-dom';
const Register = () => {

  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/api/register', {
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
      navigate('/login');
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  useEffect(() => {
    if (document.cookie.includes('jwt')) {
      navigate('/home');
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
          <p className='auth-link-text'>Already have an account? <Link className='auth-link' to='/login'>Log in</Link></p>
        </form>

      </main>

    </main>
  );
};

export default Register;