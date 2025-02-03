import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {authService} from '../../services/auth';
import './Auth.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validatie
        if (formData.password.length < 8) {
            setError('Wachtwoord moet minimaal 8 tekens lang zijn');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Wachtwoorden komen niet overeen');
            return;
        }

        try {
            setLoading(true);
            await authService.register(formData.username, formData.email, formData.password);
            navigate('/login');
        } catch (error) {
            if (error.message.includes('already exists')) {
                if (error.message.includes('Username')) {
                    setError('Deze gebruikersnaam bestaat al');
                } else if (error.message.includes('Email')) {
                    setError('Dit e-mailadres is al in gebruik');
                }
            } else {
                setError('Er is iets misgegaan bij het registreren');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>Registreren</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Gebruikersnaam</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">E-mailadres</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Wachtwoord</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Bevestig wachtwoord</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Bezig met registreren...' : 'Registreren'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
