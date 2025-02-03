import React from 'react';
import './Header.css';

const StatsItem = ({number, label}) => (
    <div className="stat-item">
        <h2>{number}</h2>
        <p>{label}</p>
    </div>
);

const Header = () => {
    return (
        <header className="header">
            <nav className="nav-container">
                <div className="logo">RecipeHub</div>
                <button className="sign-in-btn">Sign in</button>
            </nav>
            <div className="hero-section">
                <div className="hero-content">
                    <h1>Explore a variety of recipes</h1>
                    <p>Discover new culinary creations</p>
                    <div className="cta-buttons">
                        <button className="sign-up-btn">Sign up</button>
                        <button className="submit-recipe-btn">Submit recipe</button>
                    </div>
                </div>

            </div>
        </header>
    );
};

export default Header;
