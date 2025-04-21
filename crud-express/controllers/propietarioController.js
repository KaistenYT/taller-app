import Propietario from '../model/propietario.js';

export class PropietarioController {
    static async getAllPropietarios(req, res) {
        try {
            const propietarios = await Propietario.getAll();
            // Si la petición es API, devolver JSON
            if (req.path.startsWith('/api/')) {
                return res.json(propietarios);
            }
            // Si no, renderizar la vista
            res.render('pages/propietarios', { propietarios });
        } catch (error) {
            console.error('Error al obtener los propietarios:', error);
            if (req.path.startsWith('/api/')) {
                return res.status(500).json({ error: 'Error al obtener los propietarios' });
            }
            res.status(500).render('pages/error', { error: 'Error al cargar los propietarios' });
        }
    }

    static async getPropietariosData() {
        try {
            return await Propietario.getAll();
        } catch (error) {
            console.error('Error al obtener los propietarios:', error);
            throw error;
        }
    }

    static async getPropietarioById(req, res) {
        try {
            const id = req.params.id;
            const propietario = await Propietario.getById(id);
            if (propietario) {
                res.json(propietario);
            } else {
                res.status(404).json({ message: 'Propietario no encontrado' });
            }
        } catch (error) {
            console.error('Error al obtener el propietario:', error);
            res.status(500).json({ 
                error: 'Error al obtener el propietario',
                details: error.message 
            });
        }
    }

    static async createPropietarrio(req, res) {
        try {
            const nuevoPropietario = req.body;
            const id = await Propietario.create(nuevoPropietario);
            res.status(201).json({ 
                message: 'Propietario creado exitosamente',
                id: id[0] 
            });
        } catch (error) {
            console.error('Error al crear el propietario:', error);
            res.status(500).json({ 
                error: 'Error al crear el propietario',
                details: error.message 
            });
        }
    }

    static async updatePropietario(req, res) {
        try {
            const id = req.params.id;
            const propietarioActualizado = req.body;
            const filasActualizadas = await Propietario.update(id, propietarioActualizado);
            if (filasActualizadas) {
                res.json({ message: 'Propietario actualizado exitosamente' });
            } else {
                res.status(404).json({ message: 'Propietario no encontrado' });
            }
        } catch (error) {
            console.error('Error al actualizar el propietario:', error);
            res.status(500).json({ 
                error: 'Error al actualizar el propietario',
                details: error.message 
            });
        }
    }

    static async deletePropietario(req, res) {
        try {
            const id = req.params.id;
            const filasEliminadas = await Propietario.delete(id);
            if (filasEliminadas) {
                res.json({ message: 'Propietario eliminado exitosamente' });
            } else {
                res.status(404).json({ message: 'Propietario no encontrado' });
            }
        } catch (error) {
            console.error('Error al eliminar el propietario:', error);
            res.status(500).json({ 
                error: 'Error al eliminar el propietario',
                details: error.message 
            });
        }
    }
}

export default PropietarioController;