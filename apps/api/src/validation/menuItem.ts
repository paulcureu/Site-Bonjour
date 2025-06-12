// packages/validation/src/menuItem.ts
import { z } from 'zod';

export const CategoryEnum = z.enum(['STARTER', 'MAIN', 'DESSERT', 'DRINK']);

export const createMenuItemSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  category: CategoryEnum,
});

export const updateMenuItemSchema = createMenuItemSchema.partial();

export type CreateMenuItemInput = z.infer<typeof createMenuItemSchema>;
export type UpdateMenuItemInput = z.infer<typeof updateMenuItemSchema>;
