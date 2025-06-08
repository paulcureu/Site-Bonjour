import express from 'express';
import authRoutes from './routes/auth';
import statusRoutes from './routes/status';
// ­–––– DEBUG: afișează toate rutele încărcate ––––
import listEndpoints from 'express-list-endpoints';
import { env } from './env';

const app = express();

// 🟢 trebuie să fie primul!
app.use(express.json());

// 🟢 rute API
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/status', statusRoutes);

const port = Number(env.PORT);
app.listen(Number(env.PORT), env.HOST, () => console.log(`✅ Server running on port ${port}`));
