# Turnos Médicos

API REST en TypeScript para gestionar turnos médicos, especialidades y profesionales.

## Descripción

Este proyecto utiliza Express para exponer endpoints HTTP sobre información almacenada en archivos JSON. La aplicación carga la configuración de la agenda y los datos de profesionales/especialidades para poder ser consultados y modificados desde un backend simple.

## Estructura del proyecto

```text
turnos-medicos/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts
│   ├── resources.ts
│   ├── controller/
│   │   ├── especialidades.controller.ts
│   │   ├── profesionales.controller.ts
│   │   └── general.controller.ts
│   ├── data/
│   │   ├── profesionales.json
│   │   └── especialidades.json
│   └── README.md
└── dist/   # generado por TypeScript
```

## Tecnologías

- Node.js
- TypeScript
- Express
- JSON como fuente de datos

## Endpoints disponibles

### General

- GET /
  - devuelve un mensaje de bienvenida

### Especialidades

- GET /especialidades
  - retorna todas las especialidades activas
- GET /especialidades/:id
  - busca una especialidad por ID
- POST /especialidades
  - crea una nueva especialidad
- DELETE /especialidades/:id
  - desactiva una especialidad

### Profesionales

- GET /profesionales
  - retorna los profesionales activos
- GET /profesionales/:id
  - busca un profesional por ID
- POST /profesionales
  - crea un nuevo profesional
- PUT /profesionales/:id
  - modifica un profesional existente
- DELETE /profesionales/:id
  - desactiva un profesional

## Archivos importantes

### src/index.ts
Punto de entrada de la aplicación. Aquí se registran los middlewares y los endpoints de la API.

### src/resources.ts
Carga los archivos JSON desde [src/data](data) y exporta las colecciones y la configuración general:

- arrayProfesionales
- arrayEspecialidades
- configuracionAgenda

### src/controller/especialidades.controller.ts
Lógica para consultar, crear y borrar especialidades.

### src/controller/profesionales.controller.ts
Lógica para consultar, crear, modificar y borrar profesionales.

### src/controller/general.controller.ts
Controlador de respuestas generales, como la ruta no encontrada y el hello world.

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

```bash
npm install
```

## Ejecución

### Modo desarrollo

```bash
npm run dev
```

Esto inicia la API con supervisión de cambios.

### Compilar

```bash
npm run build
```

### Ejecutar versión compilada

```bash
npm start
```

## Puesto por defecto

La aplicación escucha en:

```text
http://localhost:3000
```

## Ejemplos

```bash
curl http://localhost:3000/especialidades
curl http://localhost:3000/especialidades/1
curl http://localhost:3000/profesionales
```

## Notas

Los datos se manejan como archivos JSON en [src/data](data), por lo que el proyecto sirve como base para pruebas, prototipos y desarrollo de APIs médicas sin persistencia en base de datos.

