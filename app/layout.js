import './global.css';

import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Lista de Tarefas',
  description: 'Anote suas tarefas!',
  icons: {
    icon: './icon.ico',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>
        {children}
      </body>
    </html>
  )
}