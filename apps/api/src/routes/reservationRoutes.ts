import { Router } from 'express';
import {
  getAllReservations,
  createReservation,
  updateReservation,
  deleteReservation,
} from '../controllers/reservationController';

const router = Router();

router.get('/', getAllReservations);
router.post('/', createReservation);
router.put('/:id', updateReservation);
router.delete('/:id', deleteReservation);

export const reservationRoutes = router;
