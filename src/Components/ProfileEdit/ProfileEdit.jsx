import React, {useState} from 'react';
import {authService} from '../../services/auth';
import './ProfileEdit.css';

const ProfileEdit = ({onUpdateSuccess}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
            setError(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            await authService.updateProfile(
                email || undefined,
                password || undefined,
                selectedFile || undefined
            );


            if (preview) {
                URL.revokeObjectURL(preview);
            }
            setSelectedFile(null);
            setPreview(null);
            setEmail('');
            setPassword('');

            setMessage('Profiel succesvol bijgewerkt!');

            if (onUpdateSuccess) {
                onUpdateSuccess();
            }
        } catch (error) {
            setError(error.message || 'Er is iets misgegaan bij het bijwerken van je profiel');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profile-edit">
            <h2>Profiel Bewerken</h2>
            <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Nieuwe email"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Wachtwoord</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nieuw wachtwoord"
                    />
                </div>

                <div className="form-group">
                    <label>Profielfoto</label>
                    <div className="profile-photo-container">
                        {preview ? (
                            <div className="photo-preview">
                                <img src={preview} alt="Preview"/>
                            </div>
                        ) : (
                            <div className="photo-placeholder">
                                <span>Kies een foto</span>
                            </div>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="file-input"
                            id="profile-photo"
                        />

                        <label htmlFor="profile-photo" className="photo-button">
                            Kies Foto
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="submit-button"
                    disabled={loading || (!email && !password && !selectedFile)}
                >
                    {loading ? 'Bezig met opslaan...' : 'Opslaan'}
                </button>
            </form>

            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}
        </div>
    );
};

export default ProfileEdit;
