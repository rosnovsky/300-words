import { AppProvider } from '@/contexts/NotesContext';
import { Atkinson_Hyperlegible } from 'next/font/google';

import "@/styles/globals.css"

export const metadata = {
  title: "Notes App",
  description: "A simple notes app built with Next.js and Vercel.",
}

const atkinson = Atkinson_Hyperlegible({ weight: ['400'], subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
        <div className={`${atkinson.className} app min-h-screen bg-gray-100 py-10`}>
          <div className="container mx-auto px-4">
            <AppProvider>{children}</AppProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
