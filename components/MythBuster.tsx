
import React, { useState, useCallback } from 'react';
import type { Myth } from '../types';
import { debunkMyth } from '../services/geminiService';
import Card from './common/Card';
import Spinner from './common/Spinner';

const myths: Myth[] = [
    { id: 1, title: "Herbs are 'natural' so they have no side effects.", myth: "Because herbal remedies come from plants, they are completely natural and therefore have no side effects, unlike pharmaceutical drugs." },
    { id: 2, title: "More is always better for effectiveness.", myth: "If a small dose of an herb is good for you, taking a larger dose will provide stronger and faster results." },
    { id: 3, title: "Herbal drugs don't interact with prescription medicine.", myth: "You can safely take any herbal supplement alongside your prescribed medications without any risk of interaction." },
    { id: 4, title: "If it's sold in a store, it must be safe and regulated.", myth: "Any herbal product available for purchase in a health store or online has been rigorously tested and approved for safety and efficacy by government agencies." },
];

const MythBuster: React.FC = () => {
    const [selectedMyth, setSelectedMyth] = useState<Myth | null>(null);
    const [explanation, setExplanation] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleMythClick = useCallback(async (myth: Myth) => {
        if (selectedMyth?.id === myth.id) {
             setSelectedMyth(null);
             setExplanation('');
             return;
        }
        setSelectedMyth(myth);
        setLoading(true);
        setError('');
        setExplanation('');

        try {
            const result = await debunkMyth(myth.myth);
            setExplanation(result);
        } catch (err) {
            setError('Failed to fetch explanation. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [selectedMyth]);
    
    return (
        <section id="myths" className="py-16">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-serif text-center text-brand-deep-green mb-4">Myth Busting</h2>
                <p className="text-center text-lg text-brand-deep-green/80 max-w-2xl mx-auto mb-12">Click on a common myth to reveal the science-backed truth.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {myths.map((myth) => (
                        <button
                            key={myth.id}
                            onClick={() => handleMythClick(myth)}
                            className={`p-6 text-left rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 ${
                                selectedMyth?.id === myth.id ? 'bg-brand-green text-white shadow-xl' : 'bg-white hover:shadow-lg'
                            }`}
                        >
                            <h4 className="text-xl font-bold">{myth.title}</h4>
                        </button>
                    ))}
                </div>

                {selectedMyth && (
                    <div className="mt-12">
                        <Card className="min-h-[12rem]">
                            <h3 className="text-2xl font-serif text-brand-deep-green mb-4">Debunking: "{selectedMyth.title}"</h3>
                            {loading && (
                                <div className="flex justify-center items-center py-8">
                                    <Spinner />
                                </div>
                            )}
                            {error && <p className="text-red-600">{error}</p>}
                            {explanation && <p className="text-brand-deep-green/90 leading-relaxed whitespace-pre-wrap">{explanation}</p>}
                        </Card>
                    </div>
                )}
            </div>
        </section>
    );
};

export default MythBuster;
