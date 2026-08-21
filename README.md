# RCV — Riesgo Cardiovascular

Plataforma de gestión del programa de **Riesgo Cardiovascular** (ESE Norte 3 — NexoSalud).

Cruce de resultados de laboratorio (BIOS / EMERLAB) contra la Ficha Técnica de riesgo cardiovascular (Res. 3280 de 2018), con semáforo de vencimiento y condición clínica derivada, notificaciones internas a 30 días y exportación de reportes.

## Estado

- **Frontend**: Next.js 16 + React 19 + Tailwind v4, con **mock data** para mostrar avance.
- **Backend**: FastAPI + PostgreSQL — pendiente (requiere ficha técnica real y muestras de archivos).

## Stack

| Capa | Stack | Path |
|------|-------|------|
| Frontend | Next.js 16 + React 19 + Tailwind v4 | `frontend/` |
| Backend | FastAPI + PostgreSQL (pendiente) | `backend/` |
| Deploy | Docker Compose → Coolify | `docker-compose.yml` |

## Desarrollo

```bash
cd frontend
npm install
npm run dev          # http://localhost:3000
```

## Producción (Coolify)

```bash
docker compose up -d --build
```

El servicio expone el puerto `3000` y viene con labels de Traefik para `rcv.esenorte3.lat`.

## Fuentes de datos (del programa)

| Dato | Origen |
|------|--------|
| Población | Jefe James (Popayán) — cuerpo médico |
| Laboratorios | BIOS y EMERLAB (descarga desde link) |
| Frecuencia de exámenes | Ficha Técnica de Riesgo Cardiovascular |
| Condiciones clínicas | Resolución 3280 de 2018 (RIAS) |

## Notificación

Solo interna, dentro de la plataforma (sin SMS/correo/WhatsApp).
