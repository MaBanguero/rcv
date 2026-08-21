"use client"

import { usePathname } from "next/navigation"

const BREADCRUMB_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  poblacion: "Población",
  "ficha-tecnica": "Ficha Técnica",
  laboratorios: "Laboratorios",
  "por-vencer": "Por Vencer",
  reportes: "Reportes",
}

export default function Navbar() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)
  const breadcrumbs = segments.map((seg, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/")
    const label = BREADCRUMB_LABELS[seg] || seg
    return { label, href, isLast: i === segments.length - 1 }
  })

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
      <nav className="flex items-center gap-2 text-sm">
        {breadcrumbs.length > 0 ? (
          breadcrumbs.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-2">
              {i > 0 && <span className="text-gray-300">/</span>}
              {crumb.isLast ? (
                <span className="font-medium text-gray-900 capitalize">
                  {decodeURIComponent(crumb.label)}
                </span>
              ) : (
                <a href={crumb.href} className="text-gray-500 hover:text-gray-700 transition-colors capitalize">
                  {crumb.label}
                </a>
              )}
            </span>
          ))
        ) : (
          <span className="font-medium text-gray-900">Dashboard</span>
        )}
      </nav>

      <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
        <div className="text-right">
          <p className="text-xs font-semibold text-gray-800">Coordinador RCV</p>
          <p className="text-[9px] font-bold text-primary-600 uppercase tracking-wider">Salud Pública</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-800 font-bold flex items-center justify-center text-xs uppercase">
          RC
        </div>
      </div>
    </header>
  )
}
