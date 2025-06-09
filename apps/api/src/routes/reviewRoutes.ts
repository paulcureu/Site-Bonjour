import { Router } from 'express';
import {
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
} from '../controllers/reviewController';

const router = Router();

router.get('/', getAllReviews);
router.post('/', createReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

export { router as reviewRoutes };
