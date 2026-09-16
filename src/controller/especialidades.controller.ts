import { arrayEspecialidades, type Especialidad } from "../resources.ts";
import Express, {type Response, type Request} from 'express';

export class EspecialidadesController {

    static statusCode = 200;

    static getEspecialidadId = (especialidad: any): number => {
        return Number(especialidad.especialidadId ?? especialidad.Especialidad ?? 0);
    };

    //getAll - findbyID, create, modify, delete
    static getAll = async (req: Request, res: Response) => {
        this.statusCode = 200;
        try {
           const especialidadesActivas = arrayEspecialidades.filter((esp: any) => esp.activa === true);
    
           if (especialidadesActivas.length === 0) {
               throw new Error('No hay especialidades activas');
           }
    
           return res.status(200).json(especialidadesActivas);
    
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    };

    static findById = async (req: Request, res: Response) => {
        this.statusCode = 200;
        console.log('Ingresó al endpoint GET /especialidades/:id');

        try {
            const especialidadId: number | undefined = Number(req.params.id);

            if (!especialidadId) {
                this.statusCode = 400;
                throw new Error('Error al obtener el codigo de la especialidad');
            }

            const especialidadSolicitada = arrayEspecialidades.find((esp: any) => {
                return this.getEspecialidadId(esp) === especialidadId;
            });

            if (!especialidadSolicitada) {
                this.statusCode = 404;
                throw new Error('No se encontro la especialidad solicitada');
            }

            console.clear();
            console.table(especialidadSolicitada);
            return res.status(this.statusCode)
                .json(especialidadSolicitada);

        } catch (error: any) {
            res.status(this.statusCode).json({ success: false, message: error.message });
        }
    }

    static create = async (req: Request, res: Response) => {
        this.statusCode = 201;
        try {
             const { nombreEspecialidad, activa } = req.body;
    
             if (!nombreEspecialidad || activa === undefined) {
                this.statusCode = 400;
               throw new Error('Verifica los datos enviados, faltan campos obligatorios');
             }
    
             const nuevaEspecialidad: Especialidad = {
                especialidadId: arrayEspecialidades.length + 1,
                nombreEspecialidad: nombreEspecialidad,
                activa: Boolean(activa)
             };
    
             arrayEspecialidades.push(nuevaEspecialidad);
    
             console.clear();
             console.table(nuevaEspecialidad);
             res.status(this.statusCode)
                .json(nuevaEspecialidad);
    
        } catch (error: any) {
            res.status(this.statusCode).json({ success: false, message: error.message });
        }
    }

    static delete = async (req: Request, res: Response) => {
        this.statusCode = 204;
    try {
        console.log('Ingresó al endpoint DELETE /especialidades/:id');

        const especialidadId: number = Number(req.params.id as string);

         if (!especialidadId) {
            this.statusCode = 400;
           throw new Error('Verifica el codigo o ID de la especialidad');
         }

        const index: number = arrayEspecialidades.findIndex((esp: any) => {
            return this.getEspecialidadId(esp) === especialidadId;
        });

        if (index === -1) {
            this.statusCode = 404;
            return res.status(204).json({ success: false, mensaje: 'Especialidad no encontrada' });
        }

        arrayEspecialidades[index].activa = false;

        return res.sendStatus(this.statusCode);
    } catch (error) {
        return res.status(this.statusCode).json({ success: false, mensaje: 'Error interno del servidor' });
    }
    }


}