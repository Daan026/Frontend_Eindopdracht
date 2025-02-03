import React from 'react';
import './Button.css';

const Button = ({
                    children,
                    variant = 'primary',
                    onClick,
                    className = '',
                    type = 'button'
                }) => {
    return (
        <button
            type={type}
            className={`button ${variant} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
