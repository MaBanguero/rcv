import { StatCard } from "@/components/ui/stat-card"
import { BadgeVencimiento } from "@/components/ui/badges"
import { PACIENTES, CONDICIONES, NOTIFICACIONES } from "@/lib/mock-data"
import { Users, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react"

function contarVencimientos() {
  let alDia = 0
  let vence30 = 0
  let vencido = 0
  for (const p of PACIENTES) {
    for (const i of p.indicadores) {
      if (i.estadoVencimiento === "AL_DIA") alDia++
      else if (i.estadoVencimiento === "VENCE_30") vence30++
      else if (i.estadoVencimiento === "VENCIDO") vencido++
    }
  }
  return { alDia, vence30, vencido }
}

export default function DashboardPage() {
  const { alDia, vence30, vencido } = contarVencimientos()
  const totalIndicadores = alDia + vence30 + vencido

  // Conteo de condiciones clínicas derivadas
  const porCondicion = new Map<string, number>()
  for (const p of PACIENTES) {
    porCondicion.set(p.condicionClinica, (porCondicion.get(p.condicionClinica) || 0) + 1)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Panel de Riesgo Cardiovascular</h1>
        <p className="text-sm text-gray-500 mt-1">
          Cruce de laboratorios (BIOS / EMERLAB) contra la Ficha Técnica · Res. 3280 de 2018
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Pacientes en programa" value={PACIENTES.length} icon={Users} tone="default" hint="Fuente: Jefe James, Popayán" />
        <StatCard label="Indicadores al día" value={alDia} icon={CheckCircle2} tone="emerald" hint={`${totalIndicadores} total`} />
        <StatCard label="Vencen en ≤30 días" value={vence30} icon={AlertTriangle} tone="amber" hint="Requieren notificación" />
        <StatCard label="Vencidos" value={vencido} icon={AlertCircle} tone="rose" hint="Requieren acción" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Semáforo de indicadores */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 xl:col-span-2">
          <h2 className="font-semibold text-gray-900 mb-4">Semáforo de indicadores</h2>
          <div className="flex h-5 w-full rounded-full overflow-hidden">
            <div className="bg-emerald-500" style={{ width: `${(alDia / totalIndicadores) * 100}%` }} />
            <div className="bg-amber-500" style={{ width: `${(vence30 / totalIndicadores) * 100}%` }} />
            <div className="bg-rose-500" style={{ width: `${(vencido / totalIndicadores) * 100}%` }} />
          </div>
          <div className="flex flex-wrap gap-4 mt-4 text-sm">
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500" /> Al día ({alDia})</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500" /> Vence ≤30d ({vence30})</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-rose-500" /> Vencido ({vencido})</span>
          </div>
        </div>

        {/* Condiciones clínicas derivadas */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Condición clínica derivada</h2>
          <div className="space-y-3">
            {Array.from(porCondicion.entries()).map(([cond, n]) => (
              <div key={cond} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{cond}</span>
                <span className="text-sm font-bold text-gray-900">{n}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Próximos vencimientos */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Próximos vencimientos</h2>
          <a href="/dashboard/por-vencer" className="text-sm font-semibold text-primary-600 hover:text-primary-700">
            Ver todos →
          </a>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
              <th className="px-6 py-3 font-semibold">Paciente</th>
              <th className="px-6 py-3 font-semibold">Examen</th>
              <th className="px-6 py-3 font-semibold">Vencimiento</th>
              <th className="px-6 py-3 font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {NOTIFICACIONES.map((n) => (
              <tr key={n.id} className="hover:bg-gray-50">
                <td className="px-6 py-3">
                  <p className="font-medium text-gray-900">{n.pacienteNombre}</p>
                  <p className="text-xs text-gray-400">{n.identificacion}</p>
                </td>
                <td className="px-6 py-3 text-gray-600">{n.examen}</td>
                <td className="px-6 py-3 text-gray-600">{n.fechaVencimiento}</td>
                <td className="px-6 py-3">
                  <BadgeVencimiento estado={n.diasRestantes < 0 ? "VENCIDO" : "VENCE_30"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
