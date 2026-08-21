"use client"

import { useMemo, useState } from "react"
import { LABORATORIOS } from "@/lib/mock-data"
import { Search, Download } from "lucide-react"
import { cn } from "@/lib/utils"

export default function LaboratoriosPage() {
  const [busqueda, setBusqueda] = useState("")
  const [proveedor, setProveedor] = useState("")

  const filtrados = useMemo(() => {
    return LABORATORIOS.filter((l) => {
      const coincideTexto =
        l.pacienteNombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        l.identificacion.includes(busqueda)
      const coincideProv = !proveedor || l.proveedor === proveedor
      return coincideTexto && coincideProv
    })
  }, [busqueda, proveedor])

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laboratorios</h1>
          <p className="text-sm text-gray-500 mt-1">
            Resultados descargados de los proveedores BIOS y EMERLAB
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors">
          <Download className="w-4 h-4" /> Descargar laboratorios
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por paciente o documento…"
            className="pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm w-72 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {["", "BIOS", "EMERLAB"].map((prov) => (
            <button
              key={prov}
              onClick={() => setProveedor(prov)}
              className={cn(
                "px-3 py-1.5 text-sm rounded-md transition-colors",
                proveedor === prov ? "bg-white text-gray-900 shadow-sm font-semibold" : "text-gray-500 hover:text-gray-700"
              )}
            >
              {prov === "" ? "Todos" : prov}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
              <th className="px-6 py-3 font-semibold">Paciente</th>
              <th className="px-6 py-3 font-semibold">Proveedor</th>
              <th className="px-6 py-3 font-semibold">Examen</th>
              <th className="px-6 py-3 font-semibold">Resultado</th>
              <th className="px-6 py-3 font-semibold">Fecha</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtrados.map((l) => (
              <tr key={l.id} className="hover:bg-gray-50">
                <td className="px-6 py-3">
                  <p className="font-medium text-gray-900">{l.pacienteNombre}</p>
                  <p className="text-xs text-gray-400">CC {l.identificacion}</p>
                </td>
                <td className="px-6 py-3">
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-semibold",
                    l.proveedor === "BIOS" ? "bg-blue-100 text-blue-700" : "bg-violet-100 text-violet-700"
                  )}>
                    {l.proveedor}
                  </span>
                </td>
                <td className="px-6 py-3 text-gray-600">{l.examen}</td>
                <td className="px-6 py-3 text-gray-600">
                  {l.valor} <span className="text-xs text-gray-400">{l.unidad}</span>
                </td>
                <td className="px-6 py-3 text-gray-600">{l.fechaResultado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
