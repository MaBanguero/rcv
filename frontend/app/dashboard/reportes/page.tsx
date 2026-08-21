"use client"

import { toast } from "sonner"
import { FileSpreadsheet, FileText, FileDown } from "lucide-react"
import { cn } from "@/lib/utils"

const REPORTES = [
  {
    id: "semanal",
    titulo: "Pacientes por vencer (30 días)",
    descripcion: "Listado de pacientes con exámenes próximos a vencer para gestionar citas.",
    icon: FileSpreadsheet,
    formato: "Excel",
  },
  {
    id: "vencidos",
    titulo: "Pacientes con exámenes vencidos",
    descripcion: "Cruce de indicadores contra ficha técnica donde la fecha ya se cumplió.",
    icon: FileSpreadsheet,
    formato: "Excel",
  },
  {
    id: "semaforo",
    titulo: "Semáforo de indicadores",
    descripcion: "Consolidado por paciente con estado de vencimiento y condición clínica.",
    icon: FileText,
    formato: "PDF",
  },
  {
    id: "poblacion",
    titulo: "Población activa del programa",
    descripcion: "Base completa de pacientes con sus condiciones clínicas derivadas.",
    icon: FileDown,
    formato: "CSV",
  },
]

export default function ReportesPage() {
  const exportar = (r: typeof REPORTES[number]) => {
    toast.success(`Exportando "${r.titulo}" (${r.formato})…`)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reportes</h1>
        <p className="text-sm text-gray-500 mt-1">
          Exportación de reportes del programa de riesgo cardiovascular
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {REPORTES.map((r) => (
          <div key={r.id} className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4">
            <div className="w-11 h-11 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
              <r.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900">{r.titulo}</h3>
              <p className="text-sm text-gray-500 mt-1">{r.descripcion}</p>
              <div className="mt-3 flex items-center gap-3">
                <button
                  onClick={() => exportar(r)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors",
                    "bg-primary-600 text-white hover:bg-primary-700"
                  )}
                >
                  Exportar {r.formato}
                </button>
                <span className="text-xs text-gray-400">{r.formato}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
