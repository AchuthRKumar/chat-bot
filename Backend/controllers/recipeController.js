import { retrieve_relevant_recipes, get_pinecone_index } from "./pineconeUtils.js";
import { generate_response, classify_query_intent, get_chat_history } from "./generative.js";
import { GoogleGenAI } from "@google/genai";
import multer from 'multer';
import dotenv from 'dotenv';
import { randomUUID } from 'crypto';
dotenv.config();

const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

const search_recipes = async (req, res) => {
    try {
        console.log("Request body received:", req.body);
        let { query, sessionId } = req.body;
        const image = req.file;

        if (!query && !image) {
            return res.status(400).json({ error: "Either query text or image is required" });
        }

        if (!sessionId) {
            sessionId = randomUUID();
            console.log(`Generated new sessionId: ${sessionId}`);
        }

        let relevantRecipes = [];
        const top_k = 2;
        let final_prompt = query || "Can you list the ingredients present in the image? Strictly keep the reponse with ingredients only. Do not include any other information.";
        let imageData = null;

        let shouldSearch = false;

        if (image) {
            // If an image is present, a search is non-negotiable.
            shouldSearch = true;
            console.log("Decision: Image provided, a new search is required.");

            const imageData = image.buffer.toString('base64');
            const imagePart = {
                inlineData: { data: imageData, mimeType: image.mimetype }
            };
            
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            const result = await model.generateContent([final_prompt, imagePart]);
            const textResponse = result.response.text();
            
            // Create a new, more descriptive prompt for the vector search based on image contents
            final_prompt = textResponse + "\nCan you suggest some recipes based on these ingredients? Do not suggest anything outside the context provided. It is not necessary to include all the ingredients.";

        } else {
            // For text-only messages, we check the intent.
            const history = get_chat_history(sessionId);
            if (!history) {
                // No history means it's the first message, so we must search.
                shouldSearch = true;
                console.log("Decision: New conversation, a new search is required.");
            } else {
                // For existing conversations, we classify the intent.
                const intent = await classify_query_intent(history, query);
                if (intent.requires_search) {
                    shouldSearch = true;
                    console.log("Decision: Intent requires a new database search.");
                } else {
                    console.log("Decision: Intent is a follow-up, skipping database search.");
                }
            }
        }

        // Now, perform the search only if our logic decided it's necessary
        if (shouldSearch) {
            const collection = await get_pinecone_index();
            relevantRecipes = await retrieve_relevant_recipes(final_prompt, collection, top_k);
        }
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('X-Session-Id', sessionId);

        let response = await generate_response(sessionId, final_prompt, relevantRecipes);

        for await (const chunk of response) {
            res.write(chunk.text) 
        }

        console.log("Successfully streamed response");
        res.end();
    } catch (e) {
        console.error("Error in searchRecipes:", e);
        return res.status(500).json({ error: "An error occurred" });
    }
}

export { search_recipes, upload };