import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">YummyTummy Recipe</div>
                <div className="copyright">© YummyTummy Recipe {new Date().getFullYear()}</div>
            </div>
        </footer>
    );
};

export default Footer;
