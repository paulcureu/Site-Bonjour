import { Router } from 'express';
import { getAllMenuItems } from '../controllers/menuItemController';

const router = Router();

router.get('/', getAllMenuItems);

export { router as menuItemRoutes };
