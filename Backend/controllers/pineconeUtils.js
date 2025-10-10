import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';
import fs from 'fs';
import { generateEmbeddingsBatch, generateSingleEmbedding  } from './generative.js';
dotenv.config();

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});

// Embedding dimension constant
const EMBEDDING_DIMENSION = 384;

const createRecipeChunks = (recipe) => {
    const chunks = [];
    chunks.push(`Title: ${recipe.title}\nIngredients: ${recipe.ingredients.join(', ')}`);
    const sentences = recipe.instructions.split(/(?<=[.!?])\s+/);
    const sentencesPerChunk = 3;
    for (let i = 0; i < sentences.length; i += sentencesPerChunk) {
        const instructionChunk = sentences.slice(i, i + sentencesPerChunk).join(' ');
        chunks.push(`Title: ${recipe.title}\nInstructions: ${instructionChunk}`);
    }
    return chunks;
};

const getExistingRecipeTitles = async (index) => {
    try {
        const queryResponse = await index.query({
            vector: Array(EMBEDDING_DIMENSION).fill(0),
            topK: 10000,
            includeMetadata: true
        });
        return new Set(queryResponse.matches.map(match => match.metadata.title));
    } catch (error) {
        console.error("Error getting existing recipe titles:", error);
        return new Set();
    }
};

const validateEmbeddingDimension = (embedding) => {
    if (embedding.length !== EMBEDDING_DIMENSION) {
        throw new Error(`Invalid embedding dimension. Expected ${EMBEDDING_DIMENSION}, got ${embedding.length}`);
    }
    return true;
};

const initialize_pinecone_index = async () => {
    try {
        const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);
        const recipesData = fs.readFileSync('recipes.json', { encoding: "utf-8" });
        const recipes = JSON.parse(recipesData);
        const existingRecipeTitles = await getExistingRecipeTitles(index);
        const newRecipes = recipes.filter(recipe => !existingRecipeTitles.has(recipe.title));

        if (newRecipes.length === 0) {
            console.log("No new recipes to add to Pinecone.");
            return;
        }

        const chunksWithMetadata = [];
        for (const recipe of newRecipes) {
            const originalIndex = recipes.findIndex(r => r.title === recipe.title);
            const chunks = createRecipeChunks(recipe);
            for (let i = 0; i < chunks.length; i++) {
                chunksWithMetadata.push({
                    id: `${originalIndex}_${i}`,
                    chunkText: chunks[i],
                    metadata: {
                        title: recipe.title,
                        ingredients: recipe.ingredients.join(', '),
                        instructions: recipe.instructions,
                        chunkText: chunks[i]
                    }
                });
            }
        }
        console.log(`Created a total of ${chunksWithMetadata.length} chunks.`);

        // Process and upsert in manageable batches
        const batchSize = 32; // This size is good for memory and network

        for (let i = 0; i < chunksWithMetadata.length; i += batchSize) {
            const batch = chunksWithMetadata.slice(i, i + batchSize);
            const batchTexts = batch.map(c => c.chunkText);
            const batchNum = Math.floor(i / batchSize) + 1;
            const totalBatches = Math.ceil(chunksWithMetadata.length / batchSize);

            console.log(`Processing local embedding for batch ${batchNum} of ${totalBatches}...`);
            const embeddings = await generateEmbeddingsBatch(batchTexts);

            const vectorsToUpsert = [];
            for (let j = 0; j < batch.length; j++) {
                validateEmbeddingDimension(embeddings[j]);
                vectorsToUpsert.push({
                    id: batch[j].id,
                    values: embeddings[j],
                    metadata: batch[j].metadata
                });
            }

            // UPSERT THIS BATCH to Pinecone
            console.log(`Upserting batch ${batchNum} of ${totalBatches} to Pinecone...`);
            await index.upsert(vectorsToUpsert);
        }
        
        console.log("Successfully added all new recipe chunks to Pinecone.");
        const updatedStats = await index.describeIndexStats();
        console.log(`Total vectors in Pinecone after update: ${updatedStats.totalRecordCount}`);

    } catch (error) {
        console.error("Error initializing/updating Pinecone index:", error);
    }
};

const update_pinecone_with_recipe = async (newRecipe) => {
    try {
        const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);
        const existingTitles = await getExistingRecipeTitles(index);
        if (existingTitles.has(newRecipe.title)) {
            console.log(`Recipe "${newRecipe.title}" already exists in Pinecone.`);
            return null;
        }

        const recipesData = fs.readFileSync('recipes.json', { encoding: "utf-8" });
        const recipes = JSON.parse(recipesData);
        const newId = recipes.findIndex(r => r.title === newRecipe.title).toString();

        // This function should also use chunks for consistency
        const chunks = createRecipeChunks(newRecipe);
        const embeddings = await generateEmbeddingsBatch(chunks);

        const vectors = [];
        for (let i = 0; i < chunks.length; i++) {
            validateEmbeddingDimension(embeddings[i]);
            vectors.push({
                id: `${newId}_${i}`,
                values: embeddings[i],
                metadata: {
                    title: newRecipe.title,
                    ingredients: newRecipe.ingredients.join(', '),
                    instructions: newRecipe.instructions,
                    chunkText: chunks[i]
                }
            });
        }

        await index.upsert(vectors);
        console.log(`Successfully added new recipe "${newRecipe.title}" to Pinecone.`);
        return newId;

    } catch (error) {
        console.error("Error updating Pinecone with new recipe:", error);
        throw error;
    }
};

const get_pinecone_index = async () => {
    try {
        return pinecone.Index(process.env.PINECONE_INDEX_NAME);
    } catch (error) {
        console.log("Error in retrieving index:", error);
    }
}

const retrieve_relevant_recipes = async (query, index, top_k = 3) => {
    try {
        const queryEmbedding = await generateSingleEmbedding(query);
        validateEmbeddingDimension(queryEmbedding);
        const results = await index.query({
            vector: queryEmbedding,
            topK: top_k,
            includeMetadata: true
        });

        const uniqueRecipes = new Map();
        for (const match of results.matches) {
            const title = match.metadata.title;
            if (!uniqueRecipes.has(title)) {
                uniqueRecipes.set(title, {
                    id: match.id.split('_')[0],
                    metadata: {
                        title: match.metadata.title,
                        ingredients: match.metadata.ingredients,
                        instructions: match.metadata.instructions
                    },
                    document: match.metadata.instructions,
                    distance: match.score
                });
            }
        }
        const finalRecipes = Array.from(uniqueRecipes.values());
        return {
            ids: finalRecipes.map(recipe => recipe.id),
            metadatas: finalRecipes.map(recipe => recipe.metadata),
            documents: finalRecipes.map(recipe => recipe.document),
            distances: finalRecipes.map(recipe => recipe.distance)
        };
    } catch (error) {
        console.error("Error in retrieving recipes:", error);
        throw error;
    }
};

export { 
    initialize_pinecone_index, 
    get_pinecone_index, 
    retrieve_relevant_recipes,
    update_pinecone_with_recipe 
};