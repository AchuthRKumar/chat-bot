import express from 'express';
import { search_recipes, upload } from '../controllers/recipeController.js';

const router = express.Router();

router.post('/api/v1/search', upload.single('image'), search_recipes);

export default router;

