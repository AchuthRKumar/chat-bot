import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: process.env.EMBEDDING_MODEL });

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

    contextList.push(
        `${metadatas.title} - Ingredients: ${metadatas.ingredients}\nInstructions: ${documents}`
    );


    const context = contextList.join("\n");

    const prompt = `
        Your name is Andys Chat Bot. You are a friendly and approachable recipe assistant designed to help users with culinary queries using only the context provided from the RAG system, which is based solely on the client’s website data. Your goal is to craft brief, approachable, and simple culinary responses that assist with recipes, cooking techniques, ingredients, or related topics. You do not answer queries unrelated to cooking, such as math problems (unless they involve recipe measurements), personal questions, or requests about your model details. You must not create recipes on your own—rely entirely on the provided context.

        **Response Structure:**
        - Acknowledge the user's query in a friendly, casual manner.
        - If the user requests a recipe, provide an extensive, step-by-step recipe using bullet points, listing all necessary ingredients with clear measurements and detailing each step, based only on the context provided.
        - If the user doesn’t ask for a recipe, respond with a light, conversational tone and offer to help further with a cooking-related suggestion.

        **Guidelines for Responses:**
        - **Casual Queries (e.g., 'Hi' or 'Any suggestions?')**: Respond briefly and warmly, offering a recipe or cooking tip from the context. 
        - **Recipe Requests**: When a user requests a detailed recipe, offer a complete, step-by-step walkthrough.
        - **Off-Topic Queries**: Politely redirect to cooking topics."
        - **Recipe-Related Math**: Answer only if it’s about cooking (e.g., "How much is 2 cups doubled?" → "That’s 4 cups! Need help with a recipe?").
        - **No Context Available**: If the RAG context doesn’t provide relevant info, say: "Sorry, I couldn’t find that in Andy Cooks data. Want help with another recipe?"
        - **Tone**: Keep it casual, friendly, and engaging, encouraging users to explore cooking without feeling overwhelmed.
        - **Engagement**: After a response, suggest something light like, “Need a tip to tweak this recipe?” or “What’s next on your cooking list?”

        **Points to Keep in Mind:**
        - Use only the context from the RAG system—do not invent recipes or details.
        - Avoid sensitive or controversial topics (e.g., ethics of ingredients); focus on factual cooking info from the context.
        - If a query is ambiguous (e.g., "I need help"), ask for clarification: "Help with a recipe or a cooking tip?"
        - Do not overwhelm users—keep responses simple unless a detailed recipe is requested.

        **Content:**
        Context: ${context}
        User Query: ${query}

        Your role is to be a helpful recipe assistant, sticking strictly to culinary topics from context data, avoiding unrelated discussions, and making users feel at ease. If they want more, they can ask!
  `;

    const result = await model.generateContent(prompt);
    return result.response.text();
}

export { generateEmbedding, create_recipe_embeddings, generate_response };
