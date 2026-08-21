// ─── Tipos del dominio Riesgo Cardiovascular ───────────────────────────

export type EstadoVencimiento = "AL_DIA" | "VENCE_30" | "VENCIDO" | "SIN_DATO"
export type EstadoClinico = "CONTROLADO" | "EN_RIESGO" | "DESCONTROLADO" | "SIN_DATO"

export interface CondicionClinica {
  id: string
  nombre: string
  color: string // clase tailwind para el chip
}

export interface ExamenFicha {
  id: string
  examen: string
  periodicidad: string // texto legible, ej. "Cada 3 meses"
  periodicidadDias: number
  unidad: string
  rangoNormal: string
}

export interface ReglaFicha {
  condicionId: string
  examenes: ExamenFicha[]
}

export interface IndicadorPaciente {
  examen: string
  ultimoValor: string
  unidad: string
  ultimaFecha: string
  proximaFecha: string
  estadoVencimiento: EstadoVencimiento
  estadoClinico: EstadoClinico
}

export interface Paciente {
  id: string
  identificacion: string
  nombre: string
  sexo: "F" | "M"
  edad: number
  telefono: string
  municipio: string
  regimen: string
  condicionIds: string[]
  condicionClinica: string // derivada del cruce
  indicadores: IndicadorPaciente[]
  ultimaActualizacion: string
}

export interface ResultadoLaboratorio {
  id: string
  pacienteNombre: string
  identificacion: string
  proveedor: "BIOS" | "EMERLAB"
  examen: string
  valor: string
  unidad: string
  fechaResultado: string
}

export interface Notificacion {
  id: string
  pacienteNombre: string
  identificacion: string
  examen: string
  fechaVencimiento: string
  diasRestantes: number
  telefono: string
}
