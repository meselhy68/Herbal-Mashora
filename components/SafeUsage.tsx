
import React, { useState, useEffect } from 'react';
import type { Guideline } from '../types';
import { getSafeUsageGuidelines } from '../services/geminiService';
import Card from './common/Card';
import Spinner from './common/Spinner';

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-light-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);


const SafeUsage: React.FC = () => {
    const [guidelines, setGuidelines] = useState<Guideline[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchGuidelines = async () => {
            setLoading(true);
            const res = await getSafeUsageGuidelines();
            try {
                const parsedGuidelines = JSON.parse(res);
                setGuidelines(parsedGuidelines);
            } catch (error) {
                console.error("Failed to parse guidelines:", error);
                setGuidelines([]);
            }
            setLoading(false);
        };
        fetchGuidelines();
    }, []);

    return (
        <section id="safe-usage" className="py-16 bg-brand-green/90 text-white">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-serif text-center mb-4">Stay Safe on Your Wellness Journey</h2>
                <p className="text-center text-lg text-brand-cream max-w-2xl mx-auto mb-12">Follow these essential guidelines to use herbal products responsibly.</p>

                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <Spinner />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {guidelines.map((guideline, index) => (
                             <Card key={index} className="bg-brand-cream/10 text-brand-cream">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mr-4 mt-1"><CheckIcon /></div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">{guideline.title}</h4>
                                        <p className="text-brand-cream/80">{guideline.description}</p>
                                    </div>
                                </div>
                             </Card>
                        )).slice(0, 5) /* Ensure max 5 guidelines are shown */}
                    </div>
                )}
            </div>
        </section>
    );
};

export default SafeUsage;
