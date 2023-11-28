'use client'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import './global.css';

import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const queryClient = new QueryClient()

export default function RootLayout({ children }) {

  return (
    <html lang="pt-br">
      <body className={roboto.className}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  )
}