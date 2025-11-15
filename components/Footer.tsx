
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-brand-deep-green text-brand-cream py-8">
            <div className="container mx-auto px-6 text-center">
                <p className="font-serif text-xl mb-2">Herbal Mashora</p>
                <p className="text-sm max-w-2xl mx-auto text-brand-cream/70">
                    This website is for informational and educational purposes only. It is not intended to provide medical advice or to take the place of medical advice or treatment from a personal physician. All readers/viewers of this content are advised to consult their doctors or qualified health professionals regarding specific health questions.
                </p>
                <div className="mt-4 text-sm text-brand-cream/50">
                    &copy; {new Date().getFullYear()} Herbal Mashora. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
