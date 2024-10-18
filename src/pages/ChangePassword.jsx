import '../../public/styles/pages/Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
const ChangePassword = () => {

  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const password = event.target.password1.value;
    const confirmPassword = event.target.password2.value;
    if (password !== confirmPassword) {
      setError(true);
      return;
    }
    setError(false);

    await fetch('http://localhost:4000/api/profile/password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: password,
      }),
      credentials: 'include',
    });

    navigate('/home');

  }


  return (
    <main className="auth-main">
      <header className='profile-details-header'>
                <Link to="/home" className="back-link">← Back Home</Link>
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