import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: process.env.EMBEDDING_MODEL});

const generateEmbedding = async (text) => {
    const cleanText = text.trim();
    try {
        const content = {
            parts: [{ text: cleanText }]
        };
        const response = await model.embedContent({
            content: content,
            taskType: "retrieval_document",
            title: "Recipe Retrieval"
        });
        return response.embedding.values;
    } catch (error) {
        console.error("Error generating embedding:", error);
        throw error;
    }
}

const create_recipe_embeddings = async (recipes) => {
    const embeddings = {};
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const textToEmbed = `${recipe.title} Ingredients: ${recipe.ingredients.join(', ')}`;
        embeddings[`recipe${i}`] = await generateEmbedding(textToEmbed);
    }
    return embeddings;
}

const generate_response = async (query, relevant_recipes, model) => {
    const contextList = [];
    const metadatas = relevant_recipes.metadatas[0];
    const documents = relevant_recipes.documents[0];

    for (let i = 0; i < metadatas.length; i++) {
        const metadata = metadatas[i];
        const document = documents[i];
        contextList.push(
            `${metadata.title} - Ingredients: ${metadata.ingredients}\nInstructions: ${document}`
        );
    }

    const context = contextList.join("\n");

    const prompt = `
        Your name is Andys Chat Bot. Your goal is to use the provided context (retrieved from the RAG system) and the user’s query to craft a brief, approachable, and simple culinary response. As a professional chef, aim to provide a light, friendly, and easy-to-follow suggestion, with minimal complexity.
        
        Your response should follow this structure:
        - Acknowledge the user's query in a friendly manner.
        - Provide an extensive recipe that lists all the necessary ingredients and also details each step of the process.
        - If the user doesn’t ask for a recipe, respond with a casual, conversational tone and offer to help further if they need it.

        Points to Keep in Mind:
        - If the user query is casual (e.g., 'Hi' or 'Any suggestions?'), respond in a friendly, brief manner and offer to provide a recipe if needed. If the user asks for a detailed recipe, provide a full, step-by-step guide.
        - If the user requests a recipe please provide an in-depth, comprehensive recipe with clear measurements, timings, and detailed steps.
        - **Casual and Approachable**: Your tone should feel like a friendly conversation, encouraging users to experiment without overwhelming them with complex details.
        - **Be Engaging**: Even if the user hasn’t asked for a recipe, suggest something quick and fun like, “Would you like a quick recipe idea for something tasty today?”
        - **Bullet Points for Simplicity**: When offering a recipe, keep the steps very simple and in a bullet-point format.

        Content:
        The context provided (from RAG) will help guide your answer if needed, but keep it light and simple for the user. Don't overwhelm them with too much information.
        
        Context: ${context}
        
        User Query: ${query}
        
        Your response should feel friendly, helpful, and casual, making the user feel at ease. If they want more detail, they can always ask for it.
  `;

    const result = await model.generateContent(prompt);
    return result.response.text();
}

export {generateEmbedding, create_recipe_embeddings, generate_response};
