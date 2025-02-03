import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './UserProfile.css';

const UserProfile = () => {
    const { user } = useAuth();

    if (!user) {
        return <div className="user-profile">Je bent niet ingelogd.</div>;
    }

    return (
        <div className="user-profile">
            <div className="profile-info">
                <p><strong>{user.username}</strong></p>
                {user.email && <p>{user.email}</p>}
            </div>
        </div>
    );
};

export default UserProfile;
