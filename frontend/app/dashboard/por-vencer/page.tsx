"use client"

import { useState } from "react"
import { NOTIFICACIONES } from "@/lib/mock-data"
import { BadgeVencimiento } from "@/components/ui/badges"
import { Bell, Phone } from "lucide-react"
import { toast } from "sonner"

export default function PorVencerPage() {
  const [notificados, setNotificados] = useState<Set<string>>(new Set())

  const notificar = (n: typeof NOTIFICACIONES[number]) => {
    setNotificados((prev) => new Set(prev).add(n.id))
    toast.success(`Notificación registrada para ${n.pacienteNombre}`)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pacientes por vencer (próximos 30 días)</h1>
        <p className="text-sm text-gray-500 mt-1">
          Exámenes cuyas fechas se cumplen en los próximos 30 días · notificación interna en plataforma
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {NOTIFICACIONES.map((n) => (
          <div key={n.id} className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-gray-900">{n.pacienteNombre}</p>
                <p className="text-xs text-gray-400">CC {n.identificacion}</p>
              </div>
              <BadgeVencimiento estado={n.diasRestantes < 0 ? "VENCIDO" : "VENCE_30"} />
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Examen</span>
                <span className="font-medium text-gray-900">{n.examen}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Vencimiento</span>
                <span className="font-medium text-gray-900">{n.fechaVencimiento}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Días restantes</span>
                <span className={`font-medium ${n.diasRestantes < 0 ? "text-rose-600" : "text-amber-600"}`}>
                  {n.diasRestantes < 0 ? "Vencido" : `${n.diasRestantes} días`}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <Phone className="w-3.5 h-3.5" /> {n.telefono}
              </span>
              <button
                onClick={() => notificar(n)}
                disabled={notificados.has(n.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors disabled:opacity-50
                  bg-primary-50 text-primary-700 hover:bg-primary-100"
              >
                <Bell className="w-3.5 h-3.5" />
                {notificados.has(n.id) ? "Notificado ✓" : "Notificar"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
