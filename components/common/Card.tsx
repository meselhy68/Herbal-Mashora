
import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
        <div className={`bg-white/50 backdrop-blur-sm rounded-lg shadow-lg p-6 transition-shadow hover:shadow-xl ${className}`}>
            {children}
        </div>
    );
};

export default Card;
