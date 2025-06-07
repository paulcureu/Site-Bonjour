import express from 'express';
import authRoutes from './routes/auth';
// ­–––– DEBUG: afișează toate rutele încărcate ––––
import listEndpoints from 'express-list-endpoints';
import { env } from './env';

const app = express();

// 🟢 trebuie să fie primul!
app.use(express.json());

// 🟢 rute API
app.use('/api/v1/auth', authRoutes);

const port = Number(env.PORT);
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`),
);
