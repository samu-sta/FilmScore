import React, { useEffect, useState} from 'react';
import '../../public/styles/pages/Auth.css';
import '../../public/styles/pages/ProfileDetails.css';
import { Link, useNavigate } from 'react-router-dom';
const ProfileDetails = () => {

    const navigate = useNavigate();
    const [error, setError] = React.useState(false);
    const [profile, setProfile] = useState({
        email: '',
        login: '',
        lastName: '',
        firstName: '',
        birthYear: '',
    });
    
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch('http://localhost:4000/api/profile', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                if (!res.ok) {
                    return;
                }
                const data = await res.json();
                setProfile(data);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
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
            navigate('/home');
            return;
        }
        event.preventDefault();
        try {
            const res = await fetch('http://localhost:4000/api/profile', {
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
            navigate('/home');
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
    



    return (
        <main className="auth-main">
            <header className='profile-details-header'>
                <Link to="/home" className="back-link">← Back Home</Link>
                <h1 className='auth-title profile-details-title'>Profile Details</h1>
            </header>
            <main className='auth-main'>
                <form className="auth-form" onSubmit={handleSubmit}>
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

            </main>

        </main>
    );
};

export default ProfileDetails;