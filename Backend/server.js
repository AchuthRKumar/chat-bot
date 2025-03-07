import express from 'express'
import routes from './routes/index.js'
import cors from 'cors';
import init from './controllers/initialiser.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
// init()
//   .then(() => {
//     console.log('Initial data fetching completed successfully.');
//   })
//   .catch(error => {
//     console.error('Error during initialization:', error);
//   });
app.use('/', routes);
app.listen( PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})
