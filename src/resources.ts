import fs from 'fs/promises';
import path from 'path';

const rutaProfesionales = path.resolve('src', 'data', 'profesionales.json');
const rutaEspecialidades = path.resolve('src', 'data', 'especialidades.json');  

const dataProfesionales = await fs.readFile(rutaProfesionales, 'utf-8');
const dataEspecialidades = await fs.readFile(rutaEspecialidades, 'utf-8');

export const arrayProfesionales = JSON.parse(dataProfesionales);
export const arrayEspecialidades = JSON.parse(dataEspecialidades);

interface Parametria {
  fechaMaxima: string; // Formato ISO: YYYY-MM-DD
  horaMinima:  string; // Formato: HH:mm
  horaMaxima:  string; // Formato: HH:mm
}

export const configuracionAgenda: Parametria = {
  fechaMaxima: '2026-12-30',
  horaMinima: '07:00',
  horaMaxima: '13:00'
};

export type Especialidad = {
  especialidadId: number,
  nombreEspecialidad: string,
  activa: boolean
};

export type Profesional = {
  profesionalId: number,
  nombre: string,
  especidalidad: string,
  activo: boolean
}