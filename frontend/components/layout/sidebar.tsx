"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  FlaskConical,
  Bell,
  FileDown,
  HeartPulse,
} from "lucide-react"

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Población", href: "/dashboard/poblacion", icon: Users },
  { label: "Ficha Técnica", href: "/dashboard/ficha-tecnica", icon: ClipboardList },
  { label: "Laboratorios", href: "/dashboard/laboratorios", icon: FlaskConical },
  { label: "Por Vencer (30d)", href: "/dashboard/por-vencer", icon: Bell },
  { label: "Reportes", href: "/dashboard/reportes", icon: FileDown },
]

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard"
    return pathname.startsWith(href)
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-sidebar text-sidebar-text z-40 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center gap-3 px-5 border-b border-white/10">
        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
          <HeartPulse className="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <h1 className="font-bold text-white text-sm tracking-wide">RCV</h1>
          <p className="text-[10px] text-sidebar-text">Riesgo Cardiovascular</p>
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
              "hover:bg-sidebar-hover hover:text-white",
              isActive(item.href) && "bg-sidebar-active text-sidebar-text-active"
            )}
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="px-5 py-4 border-t border-white/10">
        <p className="text-[10px] text-sidebar-text">v0.1.0 — demo</p>
        <p className="text-[10px] text-sidebar-text">Res. 3280 de 2018</p>
      </div>
    </aside>
  )
}
