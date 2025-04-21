import Recepcion from '../model/recepcion.js';

export class RecepcionController {
    
    static async getAllRecepciones(req, res) {
        try {
            const recepciones = await Recepcion.getAll();
            if (req.path.startsWith('/api/')) {
                return res.json(recepciones);
            }
            res.render('pages/recepciones', { recepciones });
        } catch (error) {
            console.error('Error al obtener las recepciones:', error);
            if (req.path.startsWith('/api/')) {
                return res.status(500).json({ 
                    error: 'Error al obtener las recepciones',
                    details: error.message 
                });
            }
            res.status(500).render('pages/error', { error: 'Error al cargar las recepciones' });
        }
    }

  
    static async getRecepcionById(req, res) {
        const { id } = req.params; 
        try {
            const recepcion = await Recepcion.getById(id);
            if (recepcion) {
                res.json(recepcion);
                 
            } else {
                res.status(404).json({ message: 'Recepción no encontrada' });
            }
        } catch (error) {
            console.error(`Error al obtener la recepción con ID ${id}:`, error);
            res.status(500).json({ 
                error: `Error al obtener la recepción con ID ${id}`,
                details: error.message 
            }); 
        }
    }

  
    static async createRecepcion(req, res) {
        const { idPropietario } = req.params; 
        const {  estado, descripcionEquipo, falla, observacion } = req.body;
        const fechaRecepcion = new Date();

        try {
            const [idRecepcion] = await Recepcion.create({
                fechaRecepcion: fechaRecepcion, 
                idPropietario: idPropietario,
                estado: estado,
                descripcionEquipo : descripcionEquipo,
                falla : falla,
                observacion : observacion
            });

            const newRecepcion = await Recepcion.getById(idRecepcion);
            res.status(201).json(newRecepcion);
            console.log("Lo que se guardo: " + newRecepcion) 
        } catch (error) {
            console.error('Error al crear la recepción:', error);
            res.status(500).json({ 
                error: 'Error al crear la recepción',
                details: error.message 
            });
        }
    }

   
    static async updateRecepcion(req, res) {
        const { id } = req.params;
        const recepcionActualizada = req.body;
        try {
            const filasActualizadas = await Recepcion.update(id, recepcionActualizada);
            if (filasActualizadas > 0) { 
                res.json({ message: 'Recepción actualizada exitosamente' }); 
            } else {
                res.status(404).json({ message: 'Recepción no encontrada' });
            }
        } catch (error) {
            console.error(`Error al actualizar la recepción con ID ${id}:`, error.message);
            res.status(500).json({ 
                error: `Error al actualizar la recepción con ID ${id}`,
                details: error.message 
            }); 
        }
    }

   
    static async deleteRecepcion(req, res) {
        const { id } = req.params;
        try {
            const filasEliminadas = await Recepcion.delete(id);
            if (filasEliminadas > 0) { 
                res.json({ message: 'Recepción eliminada exitosamente' }); 
            } else {
                res.status(404).json({ message: 'Recepción no encontrada' });
            }
        } catch (error) {
            console.error(`Error al eliminar la recepción con ID ${id}:`, error.message);
            res.status(500).json({ 
                error: `Error al eliminar la recepción con ID ${id}`,
                details: error.message 
            }); 
        }
    }
}

export default RecepcionController;