import { ChromaClient } from 'chromadb';

const chroma = new ChromaClient();

async function deleteCollection() {
  try {
    const collection = await chroma.getOrCreateCollection({ name: "recipe_collection" }); // Get a collection object from an existing collection, by name. If it doesn't exist, create it.
    chroma.deleteCollection(collection)
    console.log('Collection "recipe_collection" deleted successfully.');
  } catch (error) {
    console.error('Error deleting collection:', error);
  }
}

deleteCollection();