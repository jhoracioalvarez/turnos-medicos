# Turnos Médicos

Proyecto en TypeScript para gestionar la configuración base de una agenda médica, junto con la información de profesionales y especialidades disponibles.

## Descripción

La aplicación carga desde archivos JSON la lista de profesionales y especialidades del sistema, y expone también la configuración general de la agenda. El punto de entrada principal es [src/index.ts](../src/index.ts), que imprime en consola los datos cargados para poder validarlos rápidamente.

## Funcionalidad principal

- Carga la configuración de la agenda con:
  - fecha máxima disponible
  - hora mínima y máxima
- Lee la información de profesionales desde [src/data/profesionales.json](data/profesionales.json)
- Lee la información de especialidades desde [src/data/especialidades.json](data/especialidades.json)
- Exporta los datos para ser consumidos desde otras partes del proyecto
- Muestra la información por consola en formato de tabla para facilitar la revisión

## Estructura del proyecto

```text
turnos-medicos/
├── package.json
├── tsconfig.json
├── .gitignore
├── src/
│   ├── index.ts
│   ├── resources.ts
│   ├── README.md
│   └── data/
│       ├── profesionales.json
│       └── especialidades.json
└── dist/    # generado al compilar
```

## Archivos importantes

### src/index.ts
Es el punto de entrada de la aplicación. Aquí se importan los datos y se muestran en consola.

### src/resources.ts
Se encarga de:
- localizar los archivos JSON dentro de src/data
- leer su contenido con fs/promises
- convertirlos a objetos JavaScript con JSON.parse
- exportar las constantes `arrayProfesionales`, `arrayEspecialidades` y `configuracionAgenda`

### src/data/profesionales.json
Contiene la base de datos de profesionales médicos.

### src/data/especialidades.json
Contiene la lista de especialidades médicas disponibles.

## Requisitos

- Node.js
- npm

## Instalación

```bash
npm install
```

## Ejecución

Para ejecutar el proyecto en modo desarrollo:

```bash
npm run dev
```

Esto ejecuta el archivo principal en [src/index.ts](../src/index.ts) y mantiene la vigilancia de cambios.

También puede compilarse con:

```bash
npm run build
```

Y ejecutarse luego en producción con:

```bash
npm start
```

## Notas

Este proyecto está orientado a trabajar con datos estáticos en formato JSON, ideal para pruebas, validación de estructuras de agenda y carga inicial de información.

