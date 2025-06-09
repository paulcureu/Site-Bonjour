import express from 'express';
import authRoutes from './routes/auth';
import statusRoutes from './routes/status';
import adminRoutes from './routes/dashboard';
// ­–––– DEBUG: afișează toate rutele încărcate ––––
import listEndpoints from 'express-list-endpoints';
import { env } from './env';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utils/swagger';
import { reservationRoutes } from './routes/reservationRoutes';
import { reviewRoutes } from './routes/reviewRoutes';
import { menuItemRoutes } from './routes/menuItemRoutes';
import { mountBullBoard } from './routes/queueDashboard';

const app = express();

// 🟢 trebuie să fie primul!
app.use(express.json());

// 🟢 rute API
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/status', statusRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/reservations', reservationRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/menu-items', menuItemRoutes);

mountBullBoard(app);
const port = Number(env.PORT);
app.listen(Number(env.PORT), env.HOST, () => console.log(`✅ Server running on port ${port}`));
