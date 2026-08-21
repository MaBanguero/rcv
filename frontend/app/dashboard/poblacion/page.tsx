"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { BadgeVencimiento, BadgeClinico } from "@/components/ui/badges"
import { PACIENTES, CONDICIONES } from "@/lib/mock-data"
import { Search } from "lucide-react"

export default function PoblacionPage() {
  const [busqueda, setBusqueda] = useState("")
  const [filtroCondicion, setFiltroCondicion] = useState("")

  const nombreCondicion = (id: string) =>
    CONDICIONES.find((c) => c.id === id)?.nombre ?? id

  const peorVencimiento = (paciente: typeof PACIENTES[number]) => {
    if (paciente.indicadores.some((i) => i.estadoVencimiento === "VENCIDO")) return "VENCIDO"
    if (paciente.indicadores.some((i) => i.estadoVencimiento === "VENCE_30")) return "VENCE_30"
    return "AL_DIA"
  }

  const filtrados = useMemo(() => {
    return PACIENTES.filter((p) => {
      const coincideTexto =
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.identificacion.includes(busqueda)
      const coincideCondicion = !filtroCondicion || p.condicionIds.includes(filtroCondicion)
      return coincideTexto && coincideCondicion
    })
  }, [busqueda, filtroCondicion])

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Población</h1>
          <p className="text-sm text-gray-500 mt-1">
            {PACIENTES.length} pacientes · actualización constante (Jefe James, Popayán)
          </p>
        </div>
        <button className="px-4 py-2 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors">
          + Nuevo paciente
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o documento…"
            className="pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm w-72 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <select
          value={filtroCondicion}
          onChange={(e) => setFiltroCondicion(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Todas las condiciones</option>
          {CONDICIONES.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
              <th className="px-6 py-3 font-semibold">Paciente</th>
              <th className="px-6 py-3 font-semibold">Edad / Sexo</th>
              <th className="px-6 py-3 font-semibold">Condiciones</th>
              <th className="px-6 py-3 font-semibold">Condición clínica</th>
              <th className="px-6 py-3 font-semibold">Vencimiento</th>
              <th className="px-6 py-3 font-semibold text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtrados.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-6 py-3">
                  <p className="font-medium text-gray-900">{p.nombre}</p>
                  <p className="text-xs text-gray-400">CC {p.identificacion} · {p.municipio}</p>
                </td>
                <td className="px-6 py-3 text-gray-600">{p.edad} · {p.sexo}</td>
                <td className="px-6 py-3">
                  <div className="flex flex-wrap gap-1">
                    {p.condicionIds.map((cid) => {
                      const c = CONDICIONES.find((x) => x.id === cid)!
                      return (
                        <span key={cid} className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${c.color}`}>
                          {c.nombre.split(" ")[0]}
                        </span>
                      )
                    })}
                  </div>
                </td>
                <td className="px-6 py-3 text-gray-600">{p.condicionClinica}</td>
                <td className="px-6 py-3">
                  <BadgeVencimiento estado={peorVencimiento(p)} />
                </td>
                <td className="px-6 py-3 text-right">
                  <Link
                    href={`/dashboard/poblacion/${p.id}`}
                    className="text-primary-600 hover:text-primary-700 font-semibold text-sm"
                  >
                    Ver ficha →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
