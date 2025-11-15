import React from 'react';

const Hero: React.FC = () => {
    return (
        <section className="py-20 md:py-24 bg-brand-green text-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center text-center">
                    {/* Text Content */}
                    <div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-2 leading-tight">
                            Herbal Mashora
                        </h2>
                        <p className="text-xl md:text-2xl text-white mb-6 font-sans">
                            by Prof. Khaled Meselhy
                        </p>
                        <p className="text-lg md:text-xl text-brand-yellow max-w-3xl mx-auto">
                            Navigating the world of herbal remedies with expert guidance. Your health journey deserves clarity and safety.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;