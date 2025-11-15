
import React, { useState, useEffect } from 'react';
import { getProblemStatement } from '../services/geminiService';
import Card from './common/Card';
import Spinner from './common/Spinner';

const ProblemStatement: React.FC = () => {
    const [statement, setStatement] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchStatement = async () => {
            setLoading(true);
            const res = await getProblemStatement();
            setStatement(res);
            setLoading(false);
        };
        fetchStatement();
    }, []);

    return (
        <section id="problem" className="py-16 bg-brand-light-green/10">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <Card className="bg-brand-yellow/30 border border-brand-yellow">
                        <h3 className="text-3xl font-serif text-center text-brand-deep-green mb-6">The Hidden Dangers of "Natural" Remedies</h3>
                        {loading ? (
                            <div className="flex justify-center items-center h-24">
                                <Spinner />
                            </div>
                        ) : (
                            <p className="text-center text-lg text-brand-deep-green/90 leading-relaxed">
                                {statement}
                            </p>
                        )}
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default ProblemStatement;
