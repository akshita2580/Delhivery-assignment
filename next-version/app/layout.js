import './globals.css'

export const metadata = {
  title: 'Bot Management System',
  description: 'Warehouse bot management and monitoring system',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}


