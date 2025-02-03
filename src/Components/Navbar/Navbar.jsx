import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {authService} from '../../services/auth';
import logo from '../../assets/images/logo.png';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const user = authService.getCurrentUser();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        authService.logout();
        navigate('/');
        window.location.reload();
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <div className="logo-container">
                        <img src={logo} alt="YummyTummy Recepten" className="navbar-logo"/>
                        <span className="navbar-text">YummyTummy</span>
                    </div>
                </Link>

                <button className="hamburger" onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
                    <Link to="/" className="nav-item" onClick={() => setIsOpen(false)}>
                        Home
                    </Link>
                    <Link to="/categories" className="nav-item" onClick={() => setIsOpen(false)}>
                        Categorieën
                    </Link>
                    <Link to="/areas" className="nav-item" onClick={() => setIsOpen(false)}>
                        Landen
                    </Link>
                    <Link to="/ingredients" className="nav-item" onClick={() => setIsOpen(false)}>
                        Ingrediënten
                    </Link>
                    <Link to="/random" className="nav-item" onClick={() => setIsOpen(false)}>
                        Random Recepten
                    </Link>
                    <Link to="/search" className="nav-item" onClick={() => setIsOpen(false)}>
                        Zoeken
                    </Link>

                    {user ? (
                        <>
                            <Link to="/favorites" className="nav-item" onClick={() => setIsOpen(false)}>
                                Favorieten
                            </Link>
                            <Link to="/account" className="nav-item" onClick={() => setIsOpen(false)}>
                                Account
                            </Link>
                            <button onClick={handleLogout} className="nav-item logout-button">
                                Uitloggen
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-item" onClick={() => setIsOpen(false)}>
                                Inloggen
                            </Link>
                            <Link to="/register" className="nav-item register-button" onClick={() => setIsOpen(false)}>
                                Registreren
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
