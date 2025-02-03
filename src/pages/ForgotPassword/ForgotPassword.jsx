import React from 'react';
import {useNavigate} from 'react-router-dom';
import './ForgotPassword.css';

function ForgotPassword() {
    const navigate = useNavigate();

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-box">
                <h2>Wachtwoord vergeten...😮</h2>
                <p>
                    De wachtwoord reset functie is momenteel niet beschikbaar
                    in deze API.🤓
                </p>


                <button
                    onClick={() => navigate('/login')}
                    className="back-button"
                >
                    Terug naar Login
                </button>
            </div>
        </div>
    );
}

export default ForgotPassword;
