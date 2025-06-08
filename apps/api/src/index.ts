import express from 'express';
import authRoutes from './routes/auth';
import statusRoutes from './routes/status';
// ­–––– DEBUG: afișează toate rutele încărcate ––––
import listEndpoints from 'express-list-endpoints';
import { env } from './env';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utils/swagger';

const app = express();

// 🟢 trebuie să fie primul!
app.use(express.json());

// 🟢 rute API
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/status', statusRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port = Number(env.PORT);
app.listen(Number(env.PORT), env.HOST, () => console.log(`✅ Server running on port ${port}`));
