import { configuracionAgenda } from "./resources.ts";
import { arrayProfesionales, arrayEspecialidades } from "./resources.ts";
import Express, {type Response, type Request} from 'express';
import type { Especialidad, Profesional} from "./resources.ts";


const PORT = process.env.PORT || 3000;
const app = Express();

//MIDDLEWARES
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

//ENDPOINTS
//Hello World !!
app.get('/', (req: Request, res: Response) => {
  res.status(200).
       json({ success: true, message: 'Hello World!' });
});

// ===============================
// ESPECIALIDADES
// ===============================

// GET /especialidades
app.get('/especialidades', (req: Request, res: Response) => {
    try {
       res.status(200)
          .json(arrayEspecialidades);
    } catch (error) {
        res.status(400).json({ success: false, mensaje: 'Error al enviar datos de especialidades' });
    }
});

// GET /especialidades/:id
app.get('/especialidades/:id', (req, res) => {
    try {
        const especialidadId: number | undefined = Number(req.params.id);

        if(!especialidadId) {
            throw new Error('Error al obtener el codigo de la especialidad');
        }

        const especialidadSolicitada = arrayEspecialidades.find((esp: any) => esp.especialidadId === especialidadId);

        if(!especialidadSolicitada) {
            throw new Error('No se encontro la especialidad solicitada');
        }else{
            console.clear();
            console.table(especialidadSolicitada);
            res.status(200)
               .json(especialidadSolicitada);
        }

    } catch (error) {
        res.status(400).json({ success: false, mensaje: 'Error al devolver especialidad' });
    }
});

// POST /especialidades
app.post('/especialidades', (req: Request, res: Response) => {
    try {
         const { nombreEspecialidad, activa } = req.body;

         const nuevaEspecialidad: Especialidad = {
            especialidadId: arrayEspecialidades.length + 1,
            nombreEspecialidad: nombreEspecialidad,
            activa: Boolean(activa)
         };

         arrayEspecialidades.push(nuevaEspecialidad);

         console.clear();
         console.table(nuevaEspecialidad);
         res.status(201)
            .json(nuevaEspecialidad);

    } catch (error) {
        res.status(400).json({ success: false, mensaje: 'Error interno del servidor' });
    }
});

// DELETE /especialidades/:id
app.delete('/especialidades/:id', (req: Request, res: Response) => {
    try {
        console.log('Ingresó al endpoint DELETE /especialidades/:id');

        const especialidadId: number = Number(req.params.id as string);
        const index: number = arrayEspecialidades.findIndex((esp: any) => esp.especialidadId === especialidadId);

        if (index === -1) {
            return res.status(204).json({ success: false, mensaje: 'Especialidad no encontrada' });
        }

        arrayEspecialidades[index].activa = false;

        return res.sendStatus(204);
    } catch (error) {
        return res.status(400).json({ success: false, mensaje: 'Error interno del servidor' });
    }
});


// ===============================
// PROFESIONALES
// ===============================

// GET /profesionales
app.get('/profesionales', (req: Request, res: Response) => {
    try {
        const profesionalesFiltrados: [] = arrayProfesionales.filter((prof: any) => prof.activo === true);

        res.status(200)
           .json(profesionalesFiltrados);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error interno del servidor' });
    }
});

// GET /profesionales/:id
app.get('/profesionales/:id', (req: Request, res: Response) => {
    try {
        const profesionalId: number = Number(req.params.id as string);

        const profesionalSolicitado = arrayProfesionales.find((prof: any) => prof.profesionalId === profesionalId);

        if(profesionalSolicitado) {
            res.status(200)
               .json(profesionalSolicitado);
        } else {
            res.status(404).json({ mensaje: 'Profesional no encontrado' });
        }

    } catch (error) {
        res.status(400).json({ mensaje: 'Error buscando el profesional' });
    }
});

// POST /profesionales
app.post('/profesionales', (req: Request, res: Response) => {
    try {
        const {nombre, especidalidad, activo} = req.body;
        const nuevoProfesional: Profesional = {
            profesionalId: arrayProfesionales.length + 1,
            nombre: nombre,
            especidalidad: especidalidad,
            activo: Boolean(activo)
        };

        arrayProfesionales.push(nuevoProfesional);

        res.status(201)
           .json(nuevoProfesional);


    } catch (error) {
        res.status(400).json({ status: false, mensaje: 'Error creando un nuevo profesional' });
    }
});

// PUT /profesionales/:id
app.put('/profesionales/:id', (req: Request, res: Response) => {
    try {
        const profesonalId = req.params.profesionalId;
        const { nombre, especidalidad, activa } = req.body;

        const indice = arrayProfesionales.findIndex((prof: any) => prof.profesionalId === Number(profesonalId));

        if (indice !== -1) {

            arrayProfesionales[indice].nombre = nombre;
            arrayProfesionales[indice].especidalidad = especidalidad;
            arrayProfesionales[indice].activa = Boolean(activa);

            res.status(200).json({ mensaje: 'Profesional actualizado correctamente' });
        } else {
            res.status(404).json({ mensaje: 'Profesional no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ mensaje: 'Error actualizando el profesional' });
    }
});

// DELETE /profesionales/:id
app.delete('/profesionales/:id', (req: Request, res: Response) => {
    try {
        const profesionalId: number = Number(req.params.id as string);

        const index: number = arrayProfesionales.findIndex((prof: any) => prof.profesionalId === profesionalId);

        if (index === -1) {
            return res.status(404).json({ success: false, mensaje: 'Profesional no encontrado' });
        }

        arrayProfesionales[index].activo = false;

        //return res.sendStatus(204);
        return res.status(204).json({ mensaje: 'Profesional eliminado correctamente' });
    } catch (error) {
        return res.status(400).json({ success: false, mensaje: 'Error al borrar el profesional' });
    }
});

app.use((req: Request, res: Response) => {
    try {
        res.status(404).json({ error: 'Ruta no encontrada', ruta: req.originalUrl, metodo: req.method });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

/*
console.clear();
console.log('CONFIGURACION');
console.table(configuracionAgenda);
console.log('PROFESIONALES');
console.table(arrayProfesionales);
console.log('ESPECIALIDADES');
console.table(arrayEspecialidades);
*/