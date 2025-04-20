const Recepcion = require('../model/recepcion');

class RecepcionController {
    
    static async getAllRecepcion(req, res) {
        try {
            const recepciones = await Recepcion.getAll();
            res.status(200).json(recepciones); 
        } catch (error) {
            console.error('Error al obtener las recepciones:', error);
            res.status(500).json({ error: 'Error al obtener las recepciones de la base de datos' }); 
        }
    }

  
    static async getRecepcionById(req, res) {
        const { id } = req.params; 
        try {
            const recepcion = await Recepcion.getById(id);
            if (recepcion) {
                res.status(200).json(recepcion);
                 
            } else {
                res.status(404).json({ message: 'Recepción no encontrada' });
            }
        } catch (error) {
            console.error(`Error al obtener la recepción con ID ${id}:`, error);
            res.status(500).json({ error: `Error al obtener la recepción con ID ${id} de la base de datos` }); 
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
            res.status(500).json({ message: 'Error al crear la recepción' });
        }
    }

   
    static async updateRecepcion(req, res) {
        const { id } = req.params;
        const recepcionActualizada = req.body;
        try {
            const filasActualizadas = await Recepcion.update(id, recepcionActualizada);
            if (filasActualizadas > 0) { 
                res.status(200).json({ message: 'Recepción actualizada' }); 
            } else {
                res.status(404).json({ message: 'Recepción no encontrada' });
            }
        } catch (error) {
            console.error(`Error al actualizar la recepción con ID ${id}:`, error.message);
            res.status(500).json({ error: `Error al actualizar la recepción con ID ${id}: ${error.message}` }); 
        }
    }

   
    static async deleteRecepcion(req, res) {
        const { id } = req.params;
        try {
            const filasEliminadas = await Recepcion.delete(id);
            if (filasEliminadas > 0) { 
                res.status(200).json({ message: 'Recepción eliminada' }); 
            } else {
                res.status(404).json({ message: 'Recepción no encontrada' });
            }
        } catch (error) {
            console.error(`Error al eliminar la recepción con ID ${id}:`, error.message);
            res.status(500).json({ error: `Error al eliminar la recepción con ID ${id}: ${error.message}` }); 
        }
    }
}

module.exports = RecepcionController;