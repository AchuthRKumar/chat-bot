import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';

const extract_link = async (baseUrl) => {
  try {
    let allLinks = [];
    let page = 1;
    let hasMoreContent = true; 
    while (hasMoreContent) {
      const apiUrl = `${baseUrl}?page=${page}`;
      console.log(`Fetching ${apiUrl}`);

      const response = await axios.get(apiUrl);

      if (response.status !== 200) {
        console.warn(`HTTP error ${response.status} at page ${page}. Stopping.`);
        break;  
      }

      const html = response.data;
      const $ = cheerio.load(html);

      const newLinks = [];
      $('a.article__grid-image').each((i, el) => {
        const href = $(el).attr('href');
        if (href) {
          newLinks.push(`https://www.andy-cooks.com${href}`);
        }
      });

      if (newLinks.length === 0) {
        console.log(`No more links found at page ${page}. Stopping.`);
        hasMoreContent = false; // Stop if no new links are found
      } else {
        allLinks = allLinks.concat(newLinks);
      }

      page++;
      await new Promise(resolve => setTimeout(resolve, 500)); 
    }

    console.log(`Found ${allLinks.length} links using HTML API.`);
    return allLinks;

  } catch (error) {
    console.error(`Error extracting links from HTML API: ${error}`);
    return null;
  }
};

const get_recipe_details = async (url) => {
  try {
    const response = await axios.get(url);
    const htmlContent = response.data;
    const $ = cheerio.load(htmlContent);

    const title = $('h1.section-header__title').first().text().trim();

    const ingredients = [];
    $('.rk_ingredients.rk_margintop_large li').each((i, elem) => {
      ingredients.push($(elem).text().trim());
    });

    const instructionsArray = [];
    $('.rk_directions.rk_column.rk_margintop_large li').each((i, elem) => {
      instructionsArray.push($(elem).text().trim());
    });
    const instructionsString = instructionsArray.join('\n');

    return {
      title: title,
      ingredients: ingredients,
      instructions: instructionsString,
      url: url
    };
  } catch (e) {
    console.error(`Error getting recipe details from ${url}: ${e}`);
    return null;
  }
}

const fetchAllRecipes = async (urls) => {
  try {
    const allRecipes = [];
    for (let i = 0; i < urls.length; i++) {
      const details = await get_recipe_details(urls[i]);
      if (details) {
        allRecipes.push({
          id: `recipe${i + 1}`,
          ...details
        });
      }
    }

    fs.writeFileSync('recipes.json', JSON.stringify(allRecipes, null, 2), 'utf-8');
    console.log('Saved all recipes to recipes.json');

    return allRecipes;
  } catch (e) {
    console.error(`Error fetching all recipes: ${e}`);
    return [];
  }
};

export { extract_link, get_recipe_details, fetchAllRecipes };

