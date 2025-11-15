
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = ai.models;

export const getProblemStatement = async (): Promise<string> => {
    try {
        const response = await model.generateContent({
            model: 'gemini-2.5-flash',
            contents: "In about 100-120 words, explain the growing problem of misusing herbal drugs, highlighting the misconception that 'natural' always means 'safe'. Mention potential risks like contamination, drug interactions, and lack of regulation.",
        });
        return response.text;
    } catch (error) {
        console.error("Error generating problem statement:", error);
        return "Failed to load information. The natural remedy world is complex, and it's crucial to approach it with care. Please try again later to learn more.";
    }
};

export const debunkMyth = async (myth: string): Promise<string> => {
    try {
        const response = await model.generateContent({
            model: 'gemini-2.5-flash',
            contents: `As an expert in pharmacology and herbal medicine, debunk the following common myth in a clear, evidence-based, and easy-to-understand manner for a general audience. The myth is: "${myth}"`,
        });
        return response.text;
    } catch (error) {
        console.error("Error debunking myth:", error);
        return "Could not retrieve explanation. Remember to always consult healthcare professionals about herbal supplements. Please try again.";
    }
};

export const getSafeUsageGuidelines = async (): Promise<string> => {
    try {
        const response = await model.generateContent({
            model: 'gemini-2.5-flash',
            contents: "Generate a list of 5 key guidelines for the safe use of herbal drugs. Provide a title and a short description for each.",
             config: {
                 responseMimeType: "application/json",
                 responseSchema: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        title: {
                          type: Type.STRING,
                        },
                        description: {
                          type: Type.STRING,
                        },
                      },
                    },
                 }
             }
        });
        return response.text;
    } catch (error) {
        console.error("Error generating guidelines:", error);
        return JSON.stringify([]);
    }
};

export const getExpertAnswer = async (question: string): Promise<string> => {
    try {
        const response = await model.generateContent({
            model: 'gemini-2.5-flash',
            contents: question,
            config: {
                systemInstruction: "You are a pharmacologist specializing in herbal medicine. Provide an informative, safe, and balanced answer to the user's question. Do not provide medical diagnoses or prescriptions. Always end your response with a clear disclaimer: 'Disclaimer: This information is for educational purposes only and not a substitute for professional medical advice. Always consult with a qualified healthcare provider before starting any new treatment or supplement.'",
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error getting expert answer:", error);
        return "I'm sorry, I couldn't process your request at the moment. It's always best to direct medical questions to a qualified healthcare provider. Please try again later.";
    }
};
