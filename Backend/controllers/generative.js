import { GoogleGenAI } from "@google/genai";
import { pipeline } from "@xenova/transformers";
import dotenv from 'dotenv';

dotenv.config();

class EmbeddingPipeline {
    static task = 'feature-extraction';
    static model = 'Xenova/all-MiniLM-L6-v2';
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            console.log("Loading local embedding model for the first time...");
            this.instance = await pipeline(this.task, this.model, { progress_callback });
            console.log("Local embedding model loaded successfully.");
        }
        return this.instance;
    }
}

const generateSingleEmbedding = async (text) => {
    const embedder = await EmbeddingPipeline.getInstance();
    const result = await embedder(text.trim(), { pooling: 'mean', normalize: true });
    return Array.from(result.data);
};


const generateEmbeddingsBatch = async (texts) => {
    const embedder = await EmbeddingPipeline.getInstance();
    const cleanTexts = texts.map(t => t.trim());

    const results = await embedder(cleanTexts, { pooling: 'mean', normalize: true });
    return results.tolist();
};

const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);
const chatSessions = new Map();
const get_chat_history = (sessionId) => {
    const chat = chatSessions.get(sessionId);
    return chat ? chat.history : null;
};

const classify_query_intent = async (history, query) => {

    const prompt = `
        Based on the provided conversation history and the user's latest query, determine if a search in a recipe database is required. 
        - If the user is asking for a new recipe, a new topic, or their query is the first turn, a search IS required.
        - If the user is asking a follow-up question, referring to something already mentioned (e.g., "the first one", "how long does that take?"), a search IS NOT required.

        Conversation History:
        ${JSON.stringify(history)}

        Latest User Query: "${query}"

        Respond with only a JSON object in the format: {"requires_search": boolean}.
    `;

    try {
        const result = await genAI.models.generateContent({model:"gemini-2.5-flash", contents: prompt});
        const text = result.text;
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const classification = JSON.parse(cleanedText);
        console.log("Query Intent Classification:", classification);
        return classification;
    } catch (e) {
        console.error("Error classifying query intent:", e);
        return { requires_search: true };
    }
};

const generate_response = async (sessionId, query, relevant_recipes) => {
    const contextList = [];
    if (relevant_recipes && relevant_recipes.metadatas && relevant_recipes.metadatas.length > 0) {
        for (let i = 0; i < relevant_recipes.metadatas.length; i++) {
            const metadatas = relevant_recipes.metadatas[i];
            const documents = relevant_recipes.documents[i];
            contextList.push(
                `Recipe ${i + 1}:\n${metadatas.title} - Ingredients: ${metadatas.ingredients}\nInstructions: ${documents}`
            );
        }
    }
    
    const context = contextList.join("\n\n");

    const userMessage = `
        Here is some information from our recipe database that might be relevant. If it's empty, it means no new search was performed, so you must rely on the conversation history.
        ---
        Context: ${context || "No new context provided. Answer based on the conversation history."}
        ---
        Now, please answer the user's latest query based on our entire conversation history and any new context provided above.
        User Query: "${query}"
    `;

    let chat = chatSessions.get(sessionId);

    if (!chat) {
        console.log(`Starting new chat session for ID: ${sessionId}`);
        const initialHistory = [
             {
                role: "user",
                parts: [{ text: `
                    Your name is Recipe Chat Bot. You are a friendly and approachable recipe assistant designed to help users with culinary queries using only the context provided from the RAG system, which is based solely on the client's website data. Your goal is to craft brief, approachable, and simple culinary responses that assist with recipes, cooking techniques, ingredients, or related topics. You do not answer queries unrelated to cooking, such as math problems (unless they involve recipe measurements), personal questions, or requests about your model details. You must not create recipes on your own—rely entirely on the provided context.

                    **Response Structure:**
                    - Acknowledge the user's query in a friendly, casual manner.
                    - If the user requests a recipe, provide an extensive, step-by-step recipe using bullet points, listing all necessary ingredients with clear measurements and detailing each step, based only on the context provided.
                    - If multiple recipes are provided in the context, you can compare them or suggest variations based on the user's query.
                    - If the user doesn't ask for a recipe, respond with a light, conversational tone and offer to help further with a cooking-related suggestion.

                    **Guidelines for Responses:**
                    - **Casual Queries (e.g., 'Hi' or 'Any suggestions?')**: Respond briefly and warmly, offering a recipe or cooking tip from the context. 
                    - **Recipe Requests**: When a user requests a detailed recipe, offer a complete, step-by-step walkthrough.
                    - **Off-Topic Queries**: Politely redirect to cooking topics."
                    - **Recipe-Related Math**: Answer only if it's about cooking (e.g., "How much is 2 cups doubled?" → "That's 4 cups! Need help with a recipe?").
                    - **No Context Available**: If the RAG context doesn't provide relevant info, say: "Sorry, I couldn't find that in Recipe Cooks data. Want help with another recipe?"
                    - **Tone**: Keep it casual, friendly, and engaging, encouraging users to explore cooking without feeling overwhelmed.
                    - **Engagement**: After a response, suggest something light like, "Need a tip to tweak this recipe?" or "What's next on your cooking list?"

                    **Points to Keep in Mind:**
                    - Use only the context from the RAG system—do not invent recipes or details.
                    - Avoid sensitive or controversial topics (e.g., ethics of ingredients); focus on factual cooking info from the context.
                    - If a query is ambiguous (e.g., "I need help"), ask for clarification: "Help with a recipe or a cooking tip?"
                    - Do not overwhelm users—keep responses simple unless a detailed recipe is requested.
                    - When multiple recipes are provided, you can suggest variations or compare them based on the user's needs.

                    Your role is to be a helpful recipe assistant, sticking strictly to culinary topics from context data, avoiding unrelated discussions, and making users feel at ease. If they want more, they can ask!
                `}],
            },
            {
                role: "model",
                parts: [{ text: "Got it! I'm Recipe Chat Bot. How can I help with your cooking today?" }],
            }
        ];
        chat = genAI.chats.create({
            model: "gemini-2.5-flash",
            history: initialHistory
        });
        chatSessions.set(sessionId, chat);
    }

    const result = await chat.sendMessageStream({ message: userMessage });
    return result;
}

export { generateSingleEmbedding, generateEmbeddingsBatch, generate_response, EmbeddingPipeline, classify_query_intent, get_chat_history };