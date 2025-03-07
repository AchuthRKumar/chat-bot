import { ChromaClient, TransformersEmbeddingFunction } from 'chromadb';
import dotenv from 'dotenv';
import fs from 'fs';
import { generateEmbedding, create_recipe_embeddings } from './generative.js';
dotenv.config();

const client = new ChromaClient();


const initialize_chroma_collection = async () => {
    try {
        const collection = await client.getOrCreateCollection({ name: process.env.COLLECTION_NAME });

        const count = await collection.count();

        if (count > 0) {
            console.log("Collection already has data. Skipping initialization");
            return;
        }

        console.log("Collection is empty. Initializing with recipe data...");

        const recipesData = fs.readFileSync('recipes.json', { encoding: "utf-8" });
        const recipes = JSON.parse(recipesData);

        const recipeEmbeddings = await create_recipe_embeddings(recipes);

        const ids = Object.keys(recipeEmbeddings);
        const embeddings = Object.values(recipeEmbeddings);
        const metadatas = recipes.map(recipe => ({
            title: recipe.title,
            ingredients: recipe.ingredients.join(', ')
        }));
        const documents = recipes.map(recipe => recipe.instructions);

        await collection.add({
            ids: ids,
            embeddings: embeddings,
            metadatas: metadatas,
            documents: documents
        });

        console.log(`ChromaDB collection initialized successfully with ${recipes.length} recipes.`);
    } catch (error) {
        console.error("Error initializing ChromaDB collection:", error);
    }
};

const get_chroma_collection = async () => {
    try {
        return await client.getOrCreateCollection({ name: process.env.COLLECTION_NAME })
    } catch (error) {
        console.log("Error in retrieving collection:", error);
    }
}

const retrieve_relevant_recipes = async (query, collection, top_k = 2) => {
    console.log("Collection has", await collection.count(), "documents");
    const queryEmbedding = await generateEmbedding(query);
    const results = await collection.query({
        queryEmbeddings: [queryEmbedding],
        nResults: top_k
    })
    return results;
}


export { initialize_chroma_collection, get_chroma_collection, retrieve_relevant_recipes };