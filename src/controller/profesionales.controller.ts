import { arrayProfesionales} from "../resources.ts";
import type { Profesional } from "../resources.ts";
import Express, {type Response, type Request} from 'express';

export class ProfesionalesController {

    static statusCode = 200;

    static getAll = async (req: Request, res: Response) => {
    try {
        this.statusCode = 200;
        const profesionalesFiltrados: [] = arrayProfesionales.filter((prof: any) => prof.activo === true);

        return res.status(this.statusCode)
           .json(profesionalesFiltrados);
    } catch (error) {
        this.statusCode = 400;
        res.status(this.statusCode).json({ mensaje: 'Error interno del servidor' });
    }
}

    static findById = async (req: Request, res: Response) => {
    try {
        this.statusCode = 200;
        const profesionalId: number = Number(req.params.id as string);

        if (!profesionalId) {
           this.statusCode = 400;
           throw new Error('Verifica el codigo o ID del profesional');
         }

        const profesionalSolicitado = arrayProfesionales.find((prof: any) => prof.profesionalId === profesionalId);

        if (!profesionalSolicitado) {
            this.statusCode = 404;
           throw new Error('Error al buscar un profesional medico');
         }        

        return res.status(this.statusCode)
               .json(profesionalSolicitado);

    } catch (error: any) {
        res.status(this.statusCode).json({success: false, message: error.message});
    }
}

    static create = async (req: Request, res: Response) => {
    try {
        this.statusCode = 201;
        const {nombre, especidalidad, activo} = req.body;

        if (!nombre || !especidalidad || !activo) {
            this.statusCode = 400;
           throw new Error('Verifica los datos del nuevo profesional a crear');
         }

        const nuevoProfesional: Profesional = {
            profesionalId: arrayProfesionales.length + 1,
            nombre: nombre,
            especidalidad: especidalidad,
            activo: Boolean(activo)
        };

        arrayProfesionales.push(nuevoProfesional);

        res.status(this.statusCode)
           .json(nuevoProfesional);


    } catch (error: any) {
        res.status(this.statusCode).json({ status: false, message: error.message });
    }
}

    static modify = async (req: Request, res: Response) => {
    try {
        this.statusCode = 200;
        const profesonalId = req.params.profesionalId;

        if (!profesonalId) {
            this.statusCode = 400;
           throw new Error('Verifica el codigo o ID del profesional a buscar');
         }

        const { nombre, especidalidad, activa } = req.body;

        if (!nombre || !especidalidad || !activa) {
            this.statusCode = 400;
           throw new Error('Verifica los datos del profesional a modificar');
         }

        const indice = arrayProfesionales.findIndex((prof: any) => prof.profesionalId === Number(profesonalId));

        if (indice === -1) {
            this.statusCode = 404;
           throw new Error('No se encontró un profesional con el código indicado');
         }        

        
            arrayProfesionales[indice].nombre = nombre;
            arrayProfesionales[indice].especidalidad = especidalidad;
            arrayProfesionales[indice].activa = Boolean(activa);

            return res.status(this.statusCode).json({ mensaje: 'Profesional actualizado correctamente' });
        
    } catch (error: any) {
        res.status(this.statusCode).json({ success: false, message: error.message });
    }
}

    static delete = async (req: Request, res: Response) => {
    try {
        this.statusCode = 204;
        const profesionalId: number = Number(req.params.id as string);

        if (!profesionalId) {
            this.statusCode = 400;
           throw new Error('Verifica el codigo o ID del profesional a buscar');
         }        

        const index: number = arrayProfesionales.findIndex((prof: any) => prof.profesionalId === profesionalId);

        if (index === -1) {
            this.statusCode = 404;
            throw new Error('Verifica el codigo o ID del profesional a buscar');
        }

        arrayProfesionales[index].activo = false;

        //return res.sendStatus(204);
        return res.status(this.statusCode).json({ mensaje: 'Profesional eliminado correctamente' });
    } catch (error: any) {
        return res.status(this.statusCode).json({ success: false, message: error.message });
    }
}
}

