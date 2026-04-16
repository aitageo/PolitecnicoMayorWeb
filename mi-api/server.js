import app from './app.js';
import env from './config/env.js';
import { connectDatabase } from './config/database.js';
import { healthCheck } from './controllers/healthController.js';

const { port, mongoUri } = env;

app.get('/health', healthCheck);

async function startServer() {
  await connectDatabase(mongoUri);

  app.listen(port, () => {
    console.log('Servidor en http://localhost:' + port);
  });
}

startServer();
