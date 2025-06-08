// apps/api/src/routes/dashboard.ts
import { Router } from 'express';
import { isAdmin } from '../middlewares/isAdmin';

const router = Router();

router.get('/', isAdmin, (req, res) => {
  res.json({ message: 'Welcome, admin!' });
});

export default router;
