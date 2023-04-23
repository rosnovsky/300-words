import { z } from 'zod';
import { NextApiRequest, NextApiResponse } from 'next';

export const noteDataSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(5).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  content: z.string().min(5)
});

export function validateInput(schema: Zod.Schema, handler: (req: NextApiRequest, res: NextApiResponse) => void) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const validatedInput = schema.safeParse(req.body);

    if (!validatedInput.success) {
      res.status(400).json({ error: "Invalid input data", message: validatedInput.error.issues });
      return;
    }

    req.body = validatedInput.data;

    handler(req, res);
  };
}


