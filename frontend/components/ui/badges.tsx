import { cn } from "@/lib/utils"
import type { EstadoVencimiento, EstadoClinico } from "@/lib/types"

// ─── Semáforo de vencimiento ───────────────────────────────────────────
const VENCIMIENTO_STYLE: Record<EstadoVencimiento, string> = {
  AL_DIA: "bg-emerald-100 text-emerald-700",
  VENCE_30: "bg-amber-100 text-amber-700",
  VENCIDO: "bg-rose-100 text-rose-700",
  SIN_DATO: "bg-gray-100 text-gray-500",
}

const VENCIMIENTO_LABEL: Record<EstadoVencimiento, string> = {
  AL_DIA: "Al día",
  VENCE_30: "Vence ≤30d",
  VENCIDO: "Vencido",
  SIN_DATO: "Sin dato",
}

export function BadgeVencimiento({ estado }: { estado: EstadoVencimiento }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold", VENCIMIENTO_STYLE[estado])}>
      <span className={cn(
        "w-1.5 h-1.5 rounded-full",
        estado === "AL_DIA" && "bg-emerald-500",
        estado === "VENCE_30" && "bg-amber-500",
        estado === "VENCIDO" && "bg-rose-500",
        estado === "SIN_DATO" && "bg-gray-400",
      )} />
      {VENCIMIENTO_LABEL[estado]}
    </span>
  )
}

// ─── Semáforo clínico ──────────────────────────────────────────────────
const CLINICO_STYLE: Record<EstadoClinico, string> = {
  CONTROLADO: "bg-emerald-100 text-emerald-700",
  EN_RIESGO: "bg-amber-100 text-amber-700",
  DESCONTROLADO: "bg-rose-100 text-rose-700",
  SIN_DATO: "bg-gray-100 text-gray-500",
}

const CLINICO_LABEL: Record<EstadoClinico, string> = {
  CONTROLADO: "Controlado",
  EN_RIESGO: "En riesgo",
  DESCONTROLADO: "Descontrolado",
  SIN_DATO: "Sin dato",
}

export function BadgeClinico({ estado }: { estado: EstadoClinico }) {
  return (
    <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold", CLINICO_STYLE[estado])}>
      {CLINICO_LABEL[estado]}
    </span>
  )
}

// ─── Dot de color puro (para leyendas) ────────────────────────────────
export function Dot({ className }: { className?: string }) {
  return <span className={cn("inline-block w-2.5 h-2.5 rounded-full", className)} />
}
