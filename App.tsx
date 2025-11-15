
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProblemStatement from './components/ProblemStatement';
import MythBuster from './components/MythBuster';
import SafeUsage from './components/SafeUsage';
import AskExpert from './components/AskExpert';
import Footer from './components/Footer';

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-brand-cream text-brand-deep-green">
            <Header />
            <main>
                <Hero />
                <ProblemStatement />
                <MythBuster />
                <SafeUsage />
                <AskExpert />
            </main>
            <Footer />
        </div>
    );
};

export default App;
