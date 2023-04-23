import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export function errorHandler(res: NextApiResponse | NextResponse, error: any, errorMessage: string) {
  console.error(error);

  const errorMessageText = errorMessage || "An error occurred while processing your request.";

  res.json({ error: errorMessageText });
}
