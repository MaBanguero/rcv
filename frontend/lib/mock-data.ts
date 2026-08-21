import type {
  CondicionClinica,
  ReglaFicha,
  Paciente,
  ResultadoLaboratorio,
  Notificacion,
} from "./types"

// ─── Catálogo de condiciones clínicas (Resolución 3280 de 2018) ────────
export const CONDICIONES: CondicionClinica[] = [
  { id: "hta", nombre: "Hipertensión Arterial", color: "bg-rose-100 text-rose-700" },
  { id: "dm2", nombre: "Diabetes Mellitus Tipo 2", color: "bg-amber-100 text-amber-700" },
  { id: "dislip", nombre: "Dislipidemia", color: "bg-purple-100 text-purple-700" },
  { id: "obesidad", nombre: "Obesidad", color: "bg-orange-100 text-orange-700" },
  { id: "tabaquismo", nombre: "Tabaquismo", color: "bg-slate-200 text-slate-700" },
  { id: "erc", nombre: "Enfermedad Renal Crónica", color: "bg-blue-100 text-blue-700" },
]

// ─── Ficha técnica: qué exámenes y cada cuánto por condición ───────────
export const FICHA_TECNICA: ReglaFicha[] = [
  {
    condicionId: "hta",
    examenes: [
      { id: "hta-1", examen: "Perfil lipídico", periodicidad: "Cada 6 meses", periodicidadDias: 180, unidad: "mg/dL", rangoNormal: "LDL < 100" },
      { id: "hta-2", examen: "Creatinina sérica", periodicidad: "Cada 6 meses", periodicidadDias: 180, unidad: "mg/dL", rangoNormal: "0.6 - 1.2" },
      { id: "hta-3", examen: "Parcial de orina", periodicidad: "Anual", periodicidadDias: 365, unidad: "—", rangoNormal: "Sin proteinuria" },
    ],
  },
  {
    condicionId: "dm2",
    examenes: [
      { id: "dm2-1", examen: "HbA1c", periodicidad: "Cada 3 meses", periodicidadDias: 90, unidad: "%", rangoNormal: "< 7.0" },
      { id: "dm2-2", examen: "Glicemia en ayunas", periodicidad: "Cada 3 meses", periodicidadDias: 90, unidad: "mg/dL", rangoNormal: "70 - 110" },
      { id: "dm2-3", examen: "Creatinina sérica", periodicidad: "Cada 6 meses", periodicidadDias: 180, unidad: "mg/dL", rangoNormal: "0.6 - 1.2" },
      { id: "dm2-4", examen: "Microalbuminuria", periodicidad: "Anual", periodicidadDias: 365, unidad: "mg/24h", rangoNormal: "< 30" },
    ],
  },
  {
    condicionId: "dislip",
    examenes: [
      { id: "dislip-1", examen: "Perfil lipídico", periodicidad: "Cada 6 meses", periodicidadDias: 180, unidad: "mg/dL", rangoNormal: "LDL < 100" },
    ],
  },
  {
    condicionId: "erc",
    examenes: [
      { id: "erc-1", examen: "Creatinina sérica", periodicidad: "Cada 3 meses", periodicidadDias: 90, unidad: "mg/dL", rangoNormal: "0.6 - 1.2" },
      { id: "erc-2", examen: "Microalbuminuria", periodicidad: "Cada 3 meses", periodicidadDias: 90, unidad: "mg/24h", rangoNormal: "< 30" },
    ],
  },
]

// ─── Población (mock — la real la enviará Jefe James, Popayán) ─────────
export const PACIENTES: Paciente[] = [
  {
    id: "p1",
    identificacion: "1002456789",
    nombre: "María Fernanda López",
    sexo: "F",
    edad: 58,
    telefono: "311 234 5678",
    municipio: "Popayán",
    regimen: "Subsidiado",
    condicionIds: ["hta", "dm2"],
    condicionClinica: "HTA + DM2 descontrolada",
    indicadores: [
      { examen: "HbA1c", ultimoValor: "8.4", unidad: "%", ultimaFecha: "2026-08-01", proximaFecha: "2026-10-30", estadoVencimiento: "AL_DIA", estadoClinico: "DESCONTROLADO" },
      { examen: "Glicemia en ayunas", ultimoValor: "145", unidad: "mg/dL", ultimaFecha: "2026-08-01", proximaFecha: "2026-10-30", estadoVencimiento: "AL_DIA", estadoClinico: "EN_RIESGO" },
      { examen: "Perfil lipídico", ultimoValor: "LDL 132", unidad: "mg/dL", ultimaFecha: "2026-02-15", proximaFecha: "2026-08-14", estadoVencimiento: "VENCIDO", estadoClinico: "EN_RIESGO" },
      { examen: "Microalbuminuria", ultimoValor: "45", unidad: "mg/24h", ultimaFecha: "2025-08-20", proximaFecha: "2026-08-20", estadoVencimiento: "VENCIDO", estadoClinico: "EN_RIESGO" },
    ],
    ultimaActualizacion: "2026-08-01",
  },
  {
    id: "p2",
    identificacion: "25430187",
    nombre: "José Alberto Muñoz",
    sexo: "M",
    edad: 64,
    telefono: "320 555 1234",
    municipio: "Puerto Tejada",
    regimen: "Contributivo",
    condicionIds: ["hta"],
    condicionClinica: "HTA controlada",
    indicadores: [
      { examen: "Perfil lipídico", ultimoValor: "LDL 88", unidad: "mg/dL", ultimaFecha: "2026-07-20", proximaFecha: "2027-01-16", estadoVencimiento: "AL_DIA", estadoClinico: "CONTROLADO" },
      { examen: "Creatinina sérica", ultimoValor: "1.0", unidad: "mg/dL", ultimaFecha: "2026-07-20", proximaFecha: "2027-01-16", estadoVencimiento: "AL_DIA", estadoClinico: "CONTROLADO" },
    ],
    ultimaActualizacion: "2026-07-20",
  },
  {
    id: "p3",
    identificacion: "1061876543",
    nombre: "Carmen Elisa Rivera",
    sexo: "F",
    edad: 71,
    telefono: "315 789 4561",
    municipio: "Santander de Quilichao",
    regimen: "Subsidiado",
    condicionIds: ["dm2", "erc"],
    condicionClinica: "DM2 + ERC en riesgo",
    indicadores: [
      { examen: "HbA1c", ultimoValor: "7.2", unidad: "%", ultimaFecha: "2026-08-10", proximaFecha: "2026-11-08", estadoVencimiento: "AL_DIA", estadoClinico: "EN_RIESGO" },
      { examen: "Creatinina sérica", ultimoValor: "1.6", unidad: "mg/dL", ultimaFecha: "2026-08-10", proximaFecha: "2026-11-08", estadoVencimiento: "AL_DIA", estadoClinico: "EN_RIESGO" },
      { examen: "Microalbuminuria", ultimoValor: "180", unidad: "mg/24h", ultimaFecha: "2026-08-10", proximaFecha: "2026-11-08", estadoVencimiento: "AL_DIA", estadoClinico: "DESCONTROLADO" },
    ],
    ultimaActualizacion: "2026-08-10",
  },
  {
    id: "p4",
    identificacion: "46301987",
    nombre: "Luis Hernando Cárdenas",
    sexo: "M",
    edad: 55,
    telefono: "300 222 7788",
    municipio: "Popayán",
    regimen: "Contributivo",
    condicionIds: ["dislip", "obesidad"],
    condicionClinica: "Dislipidemia en riesgo",
    indicadores: [
      { examen: "Perfil lipídico", ultimoValor: "LDL 118", unidad: "mg/dL", ultimaFecha: "2026-03-05", proximaFecha: "2026-09-01", estadoVencimiento: "VENCE_30", estadoClinico: "EN_RIESGO" },
    ],
    ultimaActualizacion: "2026-03-05",
  },
  {
    id: "p5",
    identificacion: "1002987654",
    nombre: "Diana Carolina Paz",
    sexo: "F",
    edad: 49,
    telefono: "312 444 9900",
    municipio: "Puerto Tejada",
    regimen: "Subsidiado",
    condicionIds: ["obesidad", "tabaquismo"],
    condicionClinica: "Obesidad + tabaquismo",
    indicadores: [
      { examen: "Perfil lipídico", ultimoValor: "LDL 105", unidad: "mg/dL", ultimaFecha: "2026-02-28", proximaFecha: "2026-08-27", estadoVencimiento: "VENCE_30", estadoClinico: "EN_RIESGO" },
    ],
    ultimaActualizacion: "2026-02-28",
  },
  {
    id: "p6",
    identificacion: "1088123456",
    nombre: "Andrés Felipe Córdoba",
    sexo: "M",
    edad: 62,
    telefono: "318 666 3344",
    municipio: "Santander de Quilichao",
    regimen: "Contributivo",
    condicionIds: ["hta", "dislip", "tabaquismo"],
    condicionClinica: "HTA descontrolada + dislipidemia",
    indicadores: [
      { examen: "Perfil lipídico", ultimoValor: "LDL 155", unidad: "mg/dL", ultimaFecha: "2025-11-12", proximaFecha: "2026-05-11", estadoVencimiento: "VENCIDO", estadoClinico: "DESCONTROLADO" },
      { examen: "Creatinina sérica", ultimoValor: "1.3", unidad: "mg/dL", ultimaFecha: "2025-11-12", proximaFecha: "2026-05-11", estadoVencimiento: "VENCIDO", estadoClinico: "EN_RIESGO" },
    ],
    ultimaActualizacion: "2025-11-12",
  },
]

// ─── Laboratorios (mock — descargados de BIOS y EMERLAB) ──────────────
export const LABORATORIOS: ResultadoLaboratorio[] = [
  { id: "l1", pacienteNombre: "María Fernanda López", identificacion: "1002456789", proveedor: "BIOS", examen: "HbA1c", valor: "8.4", unidad: "%", fechaResultado: "2026-08-01" },
  { id: "l2", pacienteNombre: "María Fernanda López", identificacion: "1002456789", proveedor: "BIOS", examen: "Glicemia en ayunas", valor: "145", unidad: "mg/dL", fechaResultado: "2026-08-01" },
  { id: "l3", pacienteNombre: "José Alberto Muñoz", identificacion: "25430187", proveedor: "EMERLAB", examen: "Perfil lipídico", valor: "LDL 88", unidad: "mg/dL", fechaResultado: "2026-07-20" },
  { id: "l4", pacienteNombre: "Carmen Elisa Rivera", identificacion: "1061876543", proveedor: "BIOS", examen: "Microalbuminuria", valor: "180", unidad: "mg/24h", fechaResultado: "2026-08-10" },
  { id: "l5", pacienteNombre: "Luis Hernando Cárdenas", identificacion: "46301987", proveedor: "EMERLAB", examen: "Perfil lipídico", valor: "LDL 118", unidad: "mg/dL", fechaResultado: "2026-03-05" },
  { id: "l6", pacienteNombre: "Andrés Felipe Córdoba", identificacion: "1088123456", proveedor: "BIOS", examen: "Perfil lipídico", valor: "LDL 155", unidad: "mg/dL", fechaResultado: "2025-11-12" },
]

// ─── Notificaciones (vence en próximos 30 días) ────────────────────────
export const NOTIFICACIONES: Notificacion[] = [
  { id: "n1", pacienteNombre: "Luis Hernando Cárdenas", identificacion: "46301987", examen: "Perfil lipídico", fechaVencimiento: "2026-09-01", diasRestantes: 11, telefono: "300 222 7788" },
  { id: "n2", pacienteNombre: "Diana Carolina Paz", identificacion: "1002987654", examen: "Perfil lipídico", fechaVencimiento: "2026-08-27", diasRestantes: 6, telefono: "312 444 9900" },
  { id: "n3", pacienteNombre: "María Fernanda López", identificacion: "1002456789", examen: "Microalbuminuria", fechaVencimiento: "2026-08-20", diasRestantes: -1, telefono: "311 234 5678" },
]
