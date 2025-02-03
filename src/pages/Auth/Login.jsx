import React, {useState} from 'react';
import {useNavigate, Link, useLocation} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';
import './Auth.css';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {login} = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await login(formData.username, formData.password);
            const from = location.state?.from?.pathname || '/account';
            navigate(from);
        } catch (error) {
            setError('Er is een fout opgetreden bij het inloggen: ' + error.message);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1>Inloggen</h1>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Gebruikersnaam</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Wachtwoord</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="auth-button">Inloggen</button>
                    <div className="auth-links">
                        <Link to="/register">Nog geen account? Registreer hier</Link>
                        <Link to="/forgot-password">Wachtwoord vergeten?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
