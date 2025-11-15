import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="py-4 px-8 bg-brand-cream/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto flex justify-center md:justify-start items-baseline">
                <h1 className="text-3xl font-serif text-brand-deep-green">
                    Herbal Mashora
                </h1>
                <span className="text-lg font-sans text-brand-deep-green/80 ml-3">
                    by Prof. Khaled Meselhy
                </span>
            </div>
        </header>
    );
};

export default Header;