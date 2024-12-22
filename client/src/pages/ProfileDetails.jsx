import React, { useEffect, useState } from 'react';
import './styles/ProfileDetails.css';
import Activity from '../components/Activity.jsx';
import ConfirmationModal from '../components/ConfirmationModal.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { COOKIE_NAME, BASE_URL, API_URLS, CLIENT_URLS, ERROR_MESSAGES } from '../../../constants/constants.js';
import { deleteUser } from '../services/UserService.js';
import { activities } from '../services/activities.js';
import { getUserProfile, putUserProfile } from '../services/UserService.js';
const ProfileDetails = ({ lastActivities, setLastActivities }) => {

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
      const res = await deleteUser();
      if (res.error) {
        throw new Error(ERROR_MESSAGES.FETCH_ERROR);
      }
      document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      navigate(CLIENT_URLS.INDEX);
    } catch (error) {
      console.error(ERROR_MESSAGES.FETCH_ERROR, error);
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await getUserProfile();
        if (res.error) {
          navigate(CLIENT_URLS.HOME);
          return;
        }
        setProfile(res);
      } catch (error) {
        console.error(ERROR_MESSAGES.FETCH_ERROR, error);
      }
    }
    fetchProfileData();
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

    const body = {
      login: event.target.login.value,
      lastName: event.target.lastName.value,
      firstName: event.target.firstName.value,
      birthYear: Number(event.target.birthYear.value),
    };
    event.preventDefault();
    try {
      const res = await putUserProfile(body);

      if (res.error) {
        setError(true);
        return;
      }
      setError(false);
      setLastActivities(
        (prevActivities) => {
          const newActivities = [...prevActivities, new activities.UpdatedProfile(new Date())];
          const updatedActivities = newActivities.length > 3 ? newActivities.slice(-3) : newActivities;
          localStorage.setItem('lastActivities', JSON.stringify(updatedActivities));
          return updatedActivities;
        }
      );
      setProfile(res);
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
        <h1 className='profile-details-title'>Profile Details</h1>
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
            {lastActivities.map((activity, index) => (
              <Activity key={index} activity={activity} />
            ))}
          </ul>
        </section>

      </main>

    </main>
  );
};

export default ProfileDetails;