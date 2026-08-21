import { FICHA_TECNICA, CONDICIONES } from "@/lib/mock-data"
import { ClipboardList } from "lucide-react"

export default function FichaTecnicaPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Ficha Técnica de Riesgo Cardiovascular</h1>
        <p className="text-sm text-gray-500 mt-1">
          Define qué exámenes requiere cada condición y con qué periodicidad · Res. 3280 de 2018
        </p>
      </div>

      <div className="space-y-6">
        {FICHA_TECNICA.map((regla) => {
          const condicion = CONDICIONES.find((c) => c.id === regla.condicionId)!
          return (
            <div key={regla.condicionId} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-3">
                <ClipboardList className="w-5 h-5 text-primary-600" />
                <h2 className="font-semibold text-gray-900">{condicion.nombre}</h2>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
                    <th className="px-6 py-3 font-semibold">Examen</th>
                    <th className="px-6 py-3 font-semibold">Periodicidad</th>
                    <th className="px-6 py-3 font-semibold">Unidad</th>
                    <th className="px-6 py-3 font-semibold">Rango normal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {regla.examenes.map((e) => (
                    <tr key={e.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900">{e.examen}</td>
                      <td className="px-6 py-3 text-gray-600">{e.periodicidad}</td>
                      <td className="px-6 py-3 text-gray-600">{e.unidad}</td>
                      <td className="px-6 py-3 text-gray-600">{e.rangoNormal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        })}
      </div>
    </div>
  )
}
