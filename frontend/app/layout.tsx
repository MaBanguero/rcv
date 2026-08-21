import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "RCV — Riesgo Cardiovascular",
  description: "Plataforma de gestión del programa de Riesgo Cardiovascular",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900 antialiased font-sans">
        {children}
      </body>
    </html>
  )
}
