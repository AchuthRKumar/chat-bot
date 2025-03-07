import { initialize_pinecone_index, retrieve_relevant_recipes, get_pinecone_index } from "./pineconeUtils.js";
import { generate_response } from "./generative.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 
    }
});

const search_recipes = async (req, res) => {
    try {
        const query = req.body.query;
        const image = req.file;

        if (!query && !image) {
            return res.status(400).json({ error: "Either query text or image is required" });
        }

        let prompt = query || "Can you list the ingredients present in the image? Strictly keep the reponse with ingredients only. Do not include any other information.";
        let imageData = null;

        if (image) {
            imageData = image.buffer.toString('base64');
        }

        const collection = await get_pinecone_index();
        const top_k = 2;
        

        let response;
        if (imageData) {
            const imagePart = {
                inlineData: {
                    data: imageData,
                    mimeType: image.mimetype
                }
            };
            const result = await model.generateContent([prompt, imagePart]);
            let image_prompt = result.response.text() + "\nCan you suggest some recipes based on the ingredients. Do not suggest anything outside the context provided. It is not necessary to include all the ingredients?";
            console.log(image_prompt);
            const relevantRecipes = await retrieve_relevant_recipes(image_prompt, collection, top_k);
            response = await generate_response(image_prompt, relevantRecipes, model);
        } else {
            const relevantRecipes = await retrieve_relevant_recipes(prompt, collection, top_k);
            response = await generate_response(prompt, relevantRecipes, model);
        }

        return res.json({ response });
    } catch (e) {
        console.error("Error in searchRecipes:", e);
        return res.status(500).json({ error: "An error occurred" });
    }
}

export { search_recipes, upload };