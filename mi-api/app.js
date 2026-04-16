import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando 🔥');
});

app.use('/api', authRoutes);

export default app;