import express from 'express';
import authRoutes from './routes/auth';
import statusRoutes from './routes/status';
import adminRoutes from './routes/dashboard';
// ­–––– DEBUG: afișează toate rutele încărcate ––––
import { env } from './env';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utils/swagger';
import { reservationRoutes } from './routes/reservationRoutes';
import { reviewRoutes } from './routes/reviewRoutes';
import { menuItemRoutes } from './routes/menuItemRoutes';
import { mountBullBoard } from './routes/queueDashboard';
import debugRedis from './routes/debugRedis';
import cors from 'cors';

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
};
// 🟢 trebuie să fie primul!
app.use(express.json());

//ruta cors
app.use(cors(corsOptions));
// 🟢 rute API
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/status', statusRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/reservations', reservationRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/menu-items', menuItemRoutes);

app.use('/api/v1', debugRedis);

mountBullBoard(app);
const port = Number(env.PORT);
const isProduction = process.env.NODE_ENV === 'production';
const host = isProduction ? '0.0.0.0' : 'localhost';

app.listen(port, host, () => {
  console.log(`✅ Server running on http://${host}:${port}/api/v1/status`);
});
