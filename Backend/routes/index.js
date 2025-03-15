import express from 'express';
import { search_recipes, upload } from '../controllers/recipeController.js';
import init from '../controllers/initialiser.js';

const router = express.Router();

router.post('/api/v1/search', upload.single('image'), search_recipes);
router.post('/api/v1/update', init);
router.get('/api/v1/ping', (req, res) =>{
    res.status(200).send('pong');
    console.log("pong");
})
export default router;

