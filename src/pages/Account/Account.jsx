import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {authService} from '../../services/auth';
import UserProfile from '../../components/UserProfile/UserProfile';
import './Account.css';

const Account = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (!currentUser) {
            navigate('/login');
        } else {
            setUser(currentUser);
        }
    }, [navigate]);

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    if (!user) {
        return null;
    }

    return (
        <div className="account-page">
            <div className="account-container">
                <h1>Mijn Account</h1>
                <UserProfile />
                <div className="account-actions">
                    <button onClick={() => navigate('/favorites')} className="account-button">
                        Mijn Favorieten
                    </button>
                    <button onClick={handleLogout} className="account-button logout">
                        Uitloggen
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Account;
