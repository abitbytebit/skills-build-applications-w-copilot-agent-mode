import express from 'express';
import apiRouter from './routes/api.js';
import { connectDatabase } from './config/database.js';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

if (process.env.NODE_ENV !== 'test') {
  connectDatabase()
    .then(() => {
      app.listen(port, () => {
        console.log(`OctoFit Tracker API listening on port ${port}`);
      });
    })
    .catch((error: unknown) => {
      console.error('Error connecting to octofit_db:', error);
      process.exit(1);
    });
}

export default app;