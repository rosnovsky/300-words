import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useAppContext, AppProvider } from '@/contexts/NotesContext';

export default function App({ Component, pageProps }: AppProps) {
  return <AppProvider><Component {...pageProps} /></AppProvider>
}
