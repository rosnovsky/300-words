import { NextResponse } from 'next/server';

export function errorHandler(res: NextResponse | NextResponse, error: any, errorMessage: string) {
  console.error(error);

  const errorMessageText = errorMessage || "An error occurred while processing your request.";

  const response = {
    status: "error",
    message: errorMessageText,
  }

  return new NextResponse(response.message, { status: 500 });
}
