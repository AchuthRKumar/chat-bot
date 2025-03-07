import { extract_link, fetchAllRecipes } from "./recipeScraper.js";
import { initialize_pinecone_index } from "./pineconeUtils.js";
const init = async () => {
    const links = await extract_link("https://www.andy-cooks.com/blogs/recipes/");
    if (!links || links.length === 0) {
        console.log('No links found.');
        return;
    }
    const allRecipes = await fetchAllRecipes(links); 
    await initialize_pinecone_index();
    return;
}

export default init;