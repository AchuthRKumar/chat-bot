import express from 'express';
import { search_recipes, upload } from '../controllers/recipeController.js';
import init from '../controllers/initialiser.js';

const router = express.Router();

router.post('/api/v1/search', upload.single('image'), search_recipes);
router.post('/api/v1/update', init);

export default router;

