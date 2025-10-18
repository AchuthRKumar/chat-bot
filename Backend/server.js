import express from 'express'
import routes from './routes/index.js'
import cors from 'cors';
import init from './controllers/initialiser.js';
import { EmbeddingPipeline } from './controllers/generative.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
  exposedHeaders: 'X-Session-Id',
}));
// init()
//   .then(() => {
//     console.log('Initial data fetching completed successfully.'); 
//   })
//   .catch(error => {
//     console.error('Error during initialization:', error);
//   });
app.use('/', routes);

EmbeddingPipeline.getInstance()
    .then(() => {
        console.log('✅ Local embedding model pre-loaded successfully.');
        app.listen(PORT, () => {
            console.log(`Server is running on PORT: ${PORT}`);
        });
    })
    .catch(error => {
        console.error('❌ Failed to pre-load embedding model:', error);
    });

