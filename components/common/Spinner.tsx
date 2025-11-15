
import React from 'react';

const Spinner: React.FC<{ size?: string }> = ({ size = 'h-8 w-8' }) => {
    return (
        <div className={`animate-spin rounded-full ${size} border-b-2 border-brand-green`}></div>
    );
};

export default Spinner;
