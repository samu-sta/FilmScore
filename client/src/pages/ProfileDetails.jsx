import React, { useEffect, useState } from 'react';
import './styles/ProfileDetails.css';
import Activity from '../components/Activity.jsx';
import ConfirmationModal from '../components/ConfirmationModal.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { COOKIE_NAME, BASE_URL, API_URLS, CLIENT_URLS, ERROR_MESSAGES } from '../../../constants/constants.js';
const ProfileDetails = () => {

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [profile, setProfile] = useState({
        email: '',
        login: '',
        lastName: '',
        firstName: '',
        birthYear: '',
    });

    const handleNoModal = () => {
        setShowModal(false);
    }

    const handleYesModal = async () => {
      setShowModal(false);
      try {
          const res = await fetch(`${BASE_URL}${API_URLS.PROFILE}`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
              },
              credentials: 'include',
          });
          if (!res.ok) {
              throw new Error(ERROR_MESSAGES.FETCH_ERROR);
          }
          document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          navigate('/');
      } catch (error) {
          console.error(ERROR_MESSAGES.FETCH_ERROR, error);
      }
  };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`${BASE_URL}${API_URLS.PROFILE}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                if (!res.ok) {
                    navigate('/home');
                    return;
                }
                const data = await res.json();
                setProfile(data);
            } catch (error) {
                console.error(ERROR_MESSAGES.FETCH_ERROR, error);
            }
        }
        fetchProfile();
    }
        , []);

    const handleSubmit = async (event) => {
        const hasChanged =
            profile.login !== event.target.login.value ||
            profile.lastName !== event.target.lastName.value ||
            profile.firstName !== event.target.firstName.value ||
            profile.birthYear !== Number(event.target.birthYear.value);

        if (!hasChanged) {
            navigate(CLIENT_URLS.HOME);
            return;
        }
        event.preventDefault();
        try {
            const res = await fetch(`${BASE_URL}${API_URLS.PROFILE}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: event.target.login.value,
                    lastName: event.target.lastName.value,
                    firstName: event.target.firstName.value,
                    birthYear: Number(event.target.birthYear.value),
                }),
                credentials: 'include',
            });

            if (!res.ok) {
                setError(true);
                return;
            }
            setError(false);
            const data = await res.json();
            setProfile(data);
            navigate(CLIENT_URLS.HOME);
        } catch (error) {
            console.error(ERROR_MESSAGES.FETCH_ERROR, error);
        }
    }




    return (
        <main className="auth-main">
            <ConfirmationModal
                title="Delete Account"
                message="Are you sure you want to delete your account?"
                show={showModal}
                onClose={handleNoModal}
                onConfirm={handleYesModal}
            />
            <header className='profile-details-header'>
                <Link to={CLIENT_URLS.HOME} className="back-link">← Back Home</Link>
                <h1 className='auth-title profile-details-title'>Profile Details</h1>
                <button 
                    className='delete-account-button'
                    onClick={() => setShowModal(true)}
                    >Delete Acount</button>
            </header>
            <main className='auth-main profile-details-main'>
                <div className='profile-details-form-div'>
                    <form className="auth-form profile-details-form" onSubmit={handleSubmit}>
                        <article className="form-group">
                            <label htmlFor="login">Login</label>
                            <input type="text" id="login" name="login" required defaultValue={profile?.login} />
                        </article>
                        <article className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" name="lastName" required defaultValue={profile?.lastName} />
                        </article>
                        <article className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" name="firstName" required defaultValue={profile?.firstName} />
                        </article>
                        <article className="form-group">
                            <label htmlFor="birthYear">Year of Birth</label>
                            <input type="number" id="birthYear" name="birthYear" required defaultValue={profile?.birthYear} />
                        </article>
                        <button type="submit" className="primary-button">Confirm</button>

                        <p className={`${error ? 'error-message' : 'hidden'}`}>Email is already in use</p>
                    </form>
                </div>

                <section className='profile-details-activities'>
                    <h2>Last Activities</h2>
                    <ul className='profile-details-activities-list'>
                        <li> <Activity activityName='Updated profile' date='2021-09-10' description='Changed profile details' /> </li>
                        <li> <Activity activityName='Logged out' date='2021-09-15' description='Logged out from the system' /> </li>
                        <li> <Activity activityName='Logged in' date='2021-09-01' description='Logged in for the first time' /> </li>
                    </ul>
                </section>




            </main>

        </main>
    );
};

export default ProfileDetails;