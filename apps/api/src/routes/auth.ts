// apps/api/src/routes/auth.ts
import { Router } from 'express';
import { loginHandler, refreshHandler } from '../controllers/authController';
import { isAdmin } from '../middlewares/isAdmin';

const router = Router();
router.post('/login', loginHandler);
router.post('/refresh', refreshHandler);

export default router;
