import express from 'express';
import authRoutes from './routes/auth';
// ­–––– DEBUG: afișează toate rutele încărcate ––––
import listEndpoints from 'express-list-endpoints';

const app = express();

// 🟢 trebuie să fie primul!
app.use(express.json());

// 🟢 rute API
app.use('/api/v1/auth', authRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
