import { configuracionAgenda } from "./resources.ts";
import { ProfesionalesController } from "./controller/profesionales.controller.ts";
import { GeneralController } from "./controller/general.controller.ts";
import { EspecialidadesController} from "./controller/especialidades.controller.ts";
import Express, {type Response, type Request} from 'express';
import type { Especialidad, Profesional} from "./resources.ts";


const PORT = process.env.PORT || 3000;
const app = Express();

//MIDDLEWARES
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

//ENDPOINTS
//Hello World !!
app.get('/', GeneralController.helloWorld);

// ===============================
// ESPECIALIDADES
// ===============================

// GET /especialidades
app.get('/especialidades', EspecialidadesController.getAll);

// GET /especialidades/:id
app.get('/especialidades/:id', EspecialidadesController.findById);

// POST /especialidades
app.post('/especialidades', EspecialidadesController.create);

// DELETE /especialidades/:id
app.delete('/especialidades/:id', EspecialidadesController.delete);


// ===============================
// PROFESIONALES
// ===============================

// GET /profesionales
app.get('/profesionales', ProfesionalesController.getAll);

// GET /profesionales/:id
app.get('/profesionales/:id', ProfesionalesController.findById);

// POST /profesionales
app.post('/profesionales', ProfesionalesController.create);

// PUT /profesionales/:id
app.put('/profesionales/:id', ProfesionalesController.modify);

// DELETE /profesionales/:id
app.delete('/profesionales/:id', ProfesionalesController.delete);

app.use(GeneralController.notFound);

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