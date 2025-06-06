import { GoogleGenerativeAI,HarmCategory,HarmBlockThreshold, } from "@google/generative-ai";

const apiKey = "AIzaSyAOxVYY91lB5bsujVQnFLPm9gA9vWA0N8A";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 0.7,
    topP: 0.9,
    topK: 50,
    maxOutputTokens: 20,
    responseMimeType: "text/plain",
};

async function run(prompt) {
    const chatSession = model.startChat({
        generationConfig,
        history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    // console.log(result.response.text());
    return result.response.text();
}

export default run;