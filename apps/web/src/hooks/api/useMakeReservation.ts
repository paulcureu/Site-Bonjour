// src/hooks/api/useMakeReservation.ts
import { useMutation } from '@tanstack/react-query';
import apiClient from '@/api/apiClient';
import { createReservationSchema } from '@shared/validation';
import { z } from 'zod';

type ReservationInput = z.infer<typeof createReservationSchema>;

const makeReservation = async (newReservation: ReservationInput) => {
  const response = await apiClient.post('/api/v1/reservations', newReservation);
  return response.data;
};

export function useMakeReservation() {
  return useMutation({
    mutationFn: makeReservation,
  });
}
