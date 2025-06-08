import { Router } from 'express';
import {
  loginHandler,
  refreshHandler,
  requestPasswordResetHandler,
  resetPasswordHandler,
} from '../controllers/authController';

const router = Router();

router.post('/login', loginHandler);
router.post('/refresh', refreshHandler);
router.post('/request-password-reset', requestPasswordResetHandler);
router.post('/reset-password', resetPasswordHandler);
export default router;
