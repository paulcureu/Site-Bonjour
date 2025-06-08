// apps/api/src/routes/auth.ts
import { Router } from 'express';
import { loginHandler, refreshHandler } from '../controllers/authController';

const router = Router();
router.post('/login', loginHandler);
router.post('/refresh', refreshHandler);

export default router;
