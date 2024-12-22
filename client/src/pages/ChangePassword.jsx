import './styles/Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { COOKIE_NAME, API_URLS, BASE_URL, CLIENT_URLS } from '../../../constants/constants.js';
import { changePassword } from '../services/UserService.js';
const ChangePassword = () => {

  const navigate = useNavigate();
  const [error, setError] = useState(false);

  useEffect(() => {
    if ( ! document.cookie.includes(COOKIE_NAME)) {
      navigate(CLIENT_URLS.HOME);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const password = event.target.password1.value;
    const confirmPassword = event.target.password2.value;
    if (password !== confirmPassword) {
      setError(true);
      return;
    }
    setError(false);

    try {
      await changePassword(password);
      navigate(CLIENT_URLS.HOME);
    }
    catch (error) {
      console.error(error);
    }
  }


  return (
    <main className="auth-main">
      <header className='profile-details-header'>
                <Link to={CLIENT_URLS.HOME} className="back-link">← Back Home</Link>
                <h1 className='auth-title profile-details-title'>Change password</h1>
            </header>
      <main className='auth-main'>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Password</label>
            <input type="password" id="password1" name="password" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirm password</label>
            <input type="password" id="password2" name="password" required />
          </div>
          <button type="submit" className="primary-button">Confirm</button>
          <p className={`${error ? 'error-message' : 'hidden'}`}>Passwords do not match</p>
        </form>
      </main>
    </main>
  );
};

export default ChangePassword;