import { Note } from '@/types';
import { z } from 'zod';

export const noteDataSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(5).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  content: z.string().min(5)
});

export function validateInput(schema: Zod.Schema, input: Partial<Note>) {
  const validatedInput = schema.safeParse(input);
  if (!validatedInput.success) {
    throw new Error(validatedInput.error.issues[0].message);
  }

  return validatedInput.data;
}


