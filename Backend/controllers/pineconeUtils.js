import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';
import fs from 'fs';
import { generateEmbedding, create_recipe_embeddings } from './generative.js';
dotenv.config();

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});

const initialize_pinecone_index = async () => {
    try {
        const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);
        
        // Check if index has data
        const stats = await index.describeIndexStats();
        if (stats.totalRecordCount > 0) {
            console.log("Index already has data. Skipping initialization");
            return;
        }

        console.log("Index is empty. Initializing with recipe data...");

        const recipesData = fs.readFileSync('recipes.json', { encoding: "utf-8" });
        const recipes = JSON.parse(recipesData);

        const recipeEmbeddings = await create_recipe_embeddings(recipes);

        // Format data for Pinecone
        const vectors = Object.entries(recipeEmbeddings).map(([id, embedding], index) => ({
            id: id,
            values: embedding,
            metadata: {
                title: recipes[index].title,
                ingredients: recipes[index].ingredients.join(', '),
                instructions: recipes[index].instructions
            }
        }));

        // Batch upsert vectors
        await index.upsert(vectors);

        console.log(`Pinecone index initialized successfully with ${recipes.length} recipes.`);
    } catch (error) {
        console.error("Error initializing Pinecone index:", error);
    }
};

const get_pinecone_index = async () => {
    try {
        return pinecone.Index(process.env.PINECONE_INDEX_NAME);
    } catch (error) {
        console.log("Error in retrieving index:", error);
    }
}

const retrieve_relevant_recipes = async (query, index, top_k = 2) => {
    try {
        const queryEmbedding = await generateEmbedding(query);
        const results = await index.query({
            vector: queryEmbedding,
            topK: top_k,
            includeMetadata: true
        });

        return {
            ids: results.matches.map(match => match.id),
            metadatas: results.matches.map(match => match.metadata),
            documents: results.matches.map(match => match.metadata.instructions),
            distances: results.matches.map(match => match.score)
        };
    } catch (error) {
        console.error("Error in retrieving recipes:", error);
        throw error;
    }
};

export { initialize_pinecone_index , get_pinecone_index , retrieve_relevant_recipes };