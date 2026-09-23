import express from 'express';
import apiRouter from './routes/api.js';
import { connectDatabase } from './config/database.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

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
    .catch((error: unknown) => {
      console.error('Error connecting to octofit_db:', error);
      process.exit(1);
    });
}

export default app;