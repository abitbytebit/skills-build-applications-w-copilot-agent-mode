import express from 'express';
import apiRouter from './routes/api.js';
import { connectDatabase } from './config/database.js';
import { apiBaseUrl, port } from './config/api.js';
const app = express();
app.use(express.json());
app.use('/api', apiRouter);
app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok' });
});
if (process.env.NODE_ENV !== 'test') {
    connectDatabase()
        .then(() => {
        app.listen(port, () => {
            console.log(`OctoFit Tracker API listening at ${apiBaseUrl}`);
        });
    })
        .catch((error) => {
        console.error('Error connecting to octofit_db:', error);
        process.exit(1);
    });
}
export default app;
