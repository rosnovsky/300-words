import { NextApiResponse } from 'next';

export function errorHandler(res: NextApiResponse, error: any, errorMessage: string) {
  console.error(error);

  const errorMessageText = errorMessage || "An error occurred while processing your request.";

  res.status(500).json({ error: errorMessageText });
}
