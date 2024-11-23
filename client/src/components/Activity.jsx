import React from 'react';
import './styles/Activity.css';

const Activity = ({ activity }) => {
    const formattedDate = new Date(activity.date).toLocaleDateString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    return (
        <div className="activity">
            <h2>{activity.title}</h2>
            <p>{formattedDate}</p>
            <p>{activity.description}</p>
        </div>
    );
};

export default Activity;