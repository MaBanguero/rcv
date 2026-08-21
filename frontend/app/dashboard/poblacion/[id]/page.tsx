import Link from "next/link"
import { notFound } from "next/navigation"
import { BadgeVencimiento, BadgeClinico } from "@/components/ui/badges"
import { PACIENTES, CONDICIONES } from "@/lib/mock-data"

export default async function PacienteDetallePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const paciente = PACIENTES.find((p) => p.id === id)
  if (!paciente) notFound()

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <Link href="/dashboard/poblacion" className="text-sm text-gray-500 hover:text-gray-700">
          ← Volver a población
        </Link>
        <div className="flex items-start justify-between mt-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{paciente.nombre}</h1>
            <p className="text-sm text-gray-500 mt-1">
              CC {paciente.identificacion} · {paciente.edad} años · {paciente.sexo === "F" ? "Femenino" : "Masculino"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Última actualización</p>
            <p className="text-sm font-semibold text-gray-700">{paciente.ultimaActualizacion}</p>
          </div>
        </div>
      </div>

      {/* Datos generales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Municipio", value: paciente.municipio },
          { label: "Régimen", value: paciente.regimen },
          { label: "Teléfono", value: paciente.telefono },
          { label: "Condición clínica", value: paciente.condicionClinica },
        ].map((d) => (
          <div key={d.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider">{d.label}</p>
            <p className="font-semibold text-gray-900 mt-1">{d.value}</p>
          </div>
        ))}
      </div>

      {/* Condiciones */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-3">Condiciones clínicas (Res. 3280)</h2>
        <div className="flex flex-wrap gap-2">
          {paciente.condicionIds.map((cid) => {
            const c = CONDICIONES.find((x) => x.id === cid)!
            return (
              <span key={cid} className={`px-3 py-1 rounded-full text-sm font-medium ${c.color}`}>
                {c.nombre}
              </span>
            )
          })}
        </div>
      </div>

      {/* Indicadores */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Indicadores y semáforo</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Cruce de resultados (BIOS/EMERLAB) vs. Ficha Técnica
          </p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
              <th className="px-6 py-3 font-semibold">Examen</th>
              <th className="px-6 py-3 font-semibold">Último valor</th>
              <th className="px-6 py-3 font-semibold">Última fecha</th>
              <th className="px-6 py-3 font-semibold">Próxima fecha</th>
              <th className="px-6 py-3 font-semibold">Vencimiento</th>
              <th className="px-6 py-3 font-semibold">Clínico</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paciente.indicadores.map((ind, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-3 font-medium text-gray-900">{ind.examen}</td>
                <td className="px-6 py-3 text-gray-600">
                  {ind.ultimoValor} <span className="text-xs text-gray-400">{ind.unidad}</span>
                </td>
                <td className="px-6 py-3 text-gray-600">{ind.ultimaFecha}</td>
                <td className="px-6 py-3 text-gray-600">{ind.proximaFecha}</td>
                <td className="px-6 py-3"><BadgeVencimiento estado={ind.estadoVencimiento} /></td>
                <td className="px-6 py-3"><BadgeClinico estado={ind.estadoClinico} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
