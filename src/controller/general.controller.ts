import { type Request, type Response } from 'express';

export class GeneralController {

    static helloWorld = async (req: Request, res: Response) => {
       return res.status(200).
           json({ success: true, message: 'Hello World!' });
    }

    static notFound = async (req: Request, res: Response) => {
        try{
            return res.status(404).json({ 
                error: 'Endpoint not found',
                ruta: req.originalUrl,
                metodo: req.method
            });
        }catch(error){
            return res.status(500).json({ 
                error: 'Error Interno del Servidor'
            });
        }
    }

}