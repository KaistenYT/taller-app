const Recepcion = require('../model/recepcion');

class RecepcionController {
    /**
     * Obtiene todas las recepciones de la base de datos.
     * @param {object} req - Objeto de la petición HTTP.
     * @param {object} res - Objeto de la respuesta HTTP.
     * @returns {Promise<void>}
     */
    static async getAllRecepcion(req, res) {
        try {
            const recepciones = await Recepcion.getAll();
            res.status(200).json(recepciones); // Código de estado 200 para éxito
        } catch (error) {
            console.error('Error al obtener las recepciones:', error);
            res.status(500).json({ error: 'Error al obtener las recepciones de la base de datos' }); // Mensaje más claro
        }
    }

    /**
     * Obtiene una recepción por su ID.
     * @param {object} req - Objeto de la petición HTTP.
     * @param {object} res - Objeto de la respuesta HTTP.
     * @returns {Promise<void>}
     */
    static async getRecepcionById(req, res) {
        const { id } = req.params; // Destructuring para obtener el ID
        try {
            const recepcion = await Recepcion.getById(id);
            if (recepcion) {
                res.status(200).json(recepcion);
                 // Código de estado 200 para éxito
            } else {
                res.status(404).json({ message: 'Recepción no encontrada' }); // Código de estado 404 para no encontrado
            }
        } catch (error) {
            console.error(`Error al obtener la recepción con ID ${id}:`, error);
            res.status(500).json({ error: `Error al obtener la recepción con ID ${id} de la base de datos` }); // Mensaje más específico
        }
    }

    /**
     * Crea una nueva recepción.

     */
    static async createRecepcion(req, res) {
        const { idPropietario } = req.params; // Destructuring para obtener el ID del propietario
        const {  estado, descripcionEquipo, falla, observacion } = req.body;
        const fechaRecepcion = new Date();

        try {
            const [idRecepcion] = await Recepcion.create({
                fechaRecepcion: fechaRecepcion, // Almacena el objeto Date directamente
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

    /**
     * Actualiza una recepción existente por su ID.
     * @param {object} req - Objeto de la petición HTTP.
     * @param {object} res - Objeto de la respuesta HTTP.
     * @returns {Promise<void>}
     */
    static async updateRecepcion(req, res) {
        const { id } = req.params;
        const recepcionActualizada = req.body;
        try {
            const filasActualizadas = await Recepcion.update(id, recepcionActualizada);
            if (filasActualizadas > 0) { // Verifica si se actualizó al menos una fila
                res.status(200).json({ message: 'Recepción actualizada' }); // Código de estado 200 para éxito
            } else {
                res.status(404).json({ message: 'Recepción no encontrada' });
            }
        } catch (error) {
            console.error(`Error al actualizar la recepción con ID ${id}:`, error.message);
            res.status(500).json({ error: `Error al actualizar la recepción con ID ${id}: ${error.message}` }); // Mensaje más específico
        }
    }

    /**
     * Elimina una recepción por su ID.
     * @param {object} req - Objeto de la petición HTTP.
     * @param {object} res - Objeto de la respuesta HTTP.
     * @returns {Promise<void>}
     */
    static async deleteRecepcion(req, res) {
        const { id } = req.params;
        try {
            const filasEliminadas = await Recepcion.delete(id);
            if (filasEliminadas > 0) { // Verifica si se eliminó al menos una fila
                res.status(200).json({ message: 'Recepción eliminada' }); // Código de estado 200 para éxito
            } else {
                res.status(404).json({ message: 'Recepción no encontrada' });
            }
        } catch (error) {
            console.error(`Error al eliminar la recepción con ID ${id}:`, error.message);
            res.status(500).json({ error: `Error al eliminar la recepción con ID ${id}: ${error.message}` }); // Mensaje más específico
        }
    }
}

module.exports = RecepcionController;