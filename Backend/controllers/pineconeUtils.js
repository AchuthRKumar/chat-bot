import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';
import fs from 'fs';
import { generateEmbedding, create_recipe_embeddings } from './generative.js';
dotenv.config();

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});

// Embedding dimension constant
const EMBEDDING_DIMENSION = 768;

const getExistingRecipeTitles = async (index) => {
    try {
        // Get all vectors from the index
        const queryResponse = await index.query({
            vector: Array(EMBEDDING_DIMENSION).fill(0), // Using 768 dimensions
            topK: 10000, // Get all recipes
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
        
        // Read current recipes from file
        const recipesData = fs.readFileSync('recipes.json', { encoding: "utf-8" });
        const recipes = JSON.parse(recipesData);
        console.log(`Total recipes in recipes.json: ${recipes.length}`);

        // Get existing recipe titles from Pinecone
        const existingRecipeTitles = await getExistingRecipeTitles(index);
        console.log(`Existing recipes in Pinecone: ${existingRecipeTitles.size}`);
        
        // Filter out recipes that are already in Pinecone
        const newRecipes = recipes.filter(recipe => !existingRecipeTitles.has(recipe.title));
        console.log(`New recipes to add: ${newRecipes.length}`);

        if (newRecipes.length === 0) {
            console.log("No new recipes to add to Pinecone.");
            return;
        }

        // Create embeddings only for new recipes
        const recipeEmbeddings = await create_recipe_embeddings(newRecipes);

        // Validate embedding dimensions
        Object.values(recipeEmbeddings).forEach(validateEmbeddingDimension);

        // Format data for Pinecone with sequential IDs based on array position
        const vectors = Object.entries(recipeEmbeddings).map(([_, embedding], index) => {
            // Find the original recipe in the full recipes array to get its position
            const recipe = newRecipes[index];
            const originalIndex = recipes.findIndex(r => r.title === recipe.title);
            
            return {
                id: originalIndex.toString(), // Use the position in the original array as ID
                values: embedding,
                metadata: {
                    title: recipe.title,
                    ingredients: recipe.ingredients.join(', '),
                    instructions: recipe.instructions
                }
            };
        });

        // Batch upsert new vectors
        if (vectors.length > 0) {
            console.log('Adding recipes with IDs:', vectors.map(v => v.id));
            await index.upsert(vectors);
            console.log(`Successfully added ${vectors.length} new recipes to Pinecone.`);
            
            // Verify the total count after adding
            const updatedStats = await index.describeIndexStats();
            console.log(`Total recipes in Pinecone after update: ${updatedStats.totalRecordCount}`);
            
            // Verify each recipe was added
            const verifyResponse = await index.query({
                vector: Array(EMBEDDING_DIMENSION).fill(0),
                topK: 10000,
                includeMetadata: true
            });
            
            const addedTitles = new Set(vectors.map(v => v.metadata.title));
            const foundTitles = new Set(verifyResponse.matches.map(m => m.metadata.title));
            const missingTitles = [...addedTitles].filter(title => !foundTitles.has(title));
            
            if (missingTitles.length > 0) {
                console.log('Warning: Some recipes were not added successfully:');
                console.log(missingTitles);
            }
        }
    } catch (error) {
        console.error("Error initializing/updating Pinecone index:", error);
    }
};

// Function to update a single new recipe
const update_pinecone_with_recipe = async (newRecipe) => {
    try {
        const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);
        
        // Check if recipe already exists by title
        const existingTitles = await getExistingRecipeTitles(index);
        if (existingTitles.has(newRecipe.title)) {
            console.log(`Recipe "${newRecipe.title}" already exists in Pinecone.`);
            return null;
        }

        // Read current recipes to get the correct position
        const recipesData = fs.readFileSync('recipes.json', { encoding: "utf-8" });
        const recipes = JSON.parse(recipesData);
        const newId = recipes.findIndex(r => r.title === newRecipe.title).toString();

        // Create embedding for single recipe
        const embedding = await generateEmbedding(
            `${newRecipe.title} ${newRecipe.ingredients.join(' ')} ${newRecipe.instructions}`
        );

        // Validate embedding dimension
        validateEmbeddingDimension(embedding);

        // Upsert the new recipe
        await index.upsert([{
            id: newId,
            values: embedding,
            metadata: {
                title: newRecipe.title,
                ingredients: newRecipe.ingredients.join(', '),
                instructions: newRecipe.instructions
            }
        }]);

        // Verify the addition
        const updatedStats = await index.describeIndexStats();
        console.log(`Successfully added new recipe "${newRecipe.title}" to Pinecone.`);
        console.log(`Previous count: ${stats.totalRecordCount}`);
        console.log(`New count: ${updatedStats.totalRecordCount}`);
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

const retrieve_relevant_recipes = async (query, index, top_k = 2) => {
    try {
        const queryEmbedding = await generateEmbedding(query);
        
        // Validate query embedding dimension
        validateEmbeddingDimension(queryEmbedding);

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

export { 
    initialize_pinecone_index, 
    get_pinecone_index, 
    retrieve_relevant_recipes,
    update_pinecone_with_recipe 
};