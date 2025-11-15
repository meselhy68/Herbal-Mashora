import React, { useState, useCallback } from 'react';
import { getExpertAnswer } from '../services/geminiService';
import Card from './common/Card';
import Spinner from './common/Spinner';

const AskExpert: React.FC = () => {
    const [question, setQuestion] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim()) {
            setError('Please enter a question.');
            return;
        }
        
        setLoading(true);
        setError('');
        setAnswer('');

        try {
            const result = await getExpertAnswer(question);
            setAnswer(result);
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [question]);

    return (
        <section id="ask-expert" className="py-16 bg-brand-light-green/10">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-serif text-center text-brand-deep-green mb-4">Ask Our Virtual Expert</h2>
                <p className="text-center text-lg text-brand-deep-green/80 max-w-3xl mx-auto mb-12">
                    Have a general question about herbal supplements? Our virtual expert, trained by pharmacologists under the guidance of Prof. Khaled Meselhy, is here to provide safe, educational insights.
                </p>
                
                <div className="max-w-3xl mx-auto">
                    {/* Form and Response */}
                    <div>
                        <Card>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="expert-question" className="block text-lg font-semibold text-brand-deep-green mb-2">Your Question:</label>
                                <textarea
                                    id="expert-question"
                                    value={question}
                                    onChange={(e) => { setQuestion(e.target.value); setError(''); }}
                                    placeholder="e.g., What should I look for on a supplement label?"
                                    className="w-full p-3 border border-brand-green/30 rounded-lg focus:ring-2 focus:ring-brand-green focus:outline-none transition"
                                    rows={4}
                                    disabled={loading}
                                    aria-label="Your question for the virtual expert"
                                />
                                {error && <p className="text-red-500 mt-2">{error}</p>}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="mt-4 w-full bg-brand-green text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-deep-green transition-colors disabled:bg-gray-400 flex items-center justify-center"
                                >
                                    {loading ? <Spinner size="h-6 w-6" /> : 'Get an Answer'}
                                </button>
                            </form>
                        </Card>

                        {(loading || answer) && (
                            <div className="mt-8">
                                <Card className="min-h-[10rem]">
                                    <h3 className="text-2xl font-serif text-brand-deep-green mb-4">Expert's Response</h3>
                                    {loading && (
                                        <div className="flex justify-center items-center py-8">
                                            <Spinner />
                                        </div>
                                    )}
                                    {answer && <p className="text-brand-deep-green/90 leading-relaxed whitespace-pre-wrap">{answer}</p>}
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AskExpert;