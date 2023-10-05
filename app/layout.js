export const metadata = {
  title: 'Lista de Tarefas',
  description: 'Anote suas tarefas!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}