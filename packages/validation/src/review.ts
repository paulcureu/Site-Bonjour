// packages/validation/src/review.ts
import { z } from 'zod';

export const createReviewSchema = z.object({
  name: z.string().min(1),
  rating: z.number().min(1).max(5),
  comment: z.string().min(5),
});

export const updateReviewSchema = createReviewSchema.partial();

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;
