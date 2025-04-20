import Propietario from '../model/propietario.js';

export class PropietarioController {
    static async getAllPropietarios(req, res) {
        try {
            const propietarios = await Propietario.getAll();
            res.render('pages/propietarios', { propietarios });
        } catch (error) {
            console.error('Error al obtener los propietarios:', error);
            res.status(500).render('pages/error', { error: 'Error al cargar los propietarios' });
        }
    }

    static async getPropietariosData() {
        try {
            return await Propietario.getAll();
            res.render('pages/propietarios' , {propietario})
        } catch (error) {
            console.error('Error al obtener los propietarios:', error);
            res.status(500).render('pages/error', { error: 'Error al cargar el propietario' });
            throw error;
        }
    }

    static async getPropietarioById(req, res) {
        const id = req.params.id;
        try {
            const propietario = await Propietario.getById(id);
            if (propietario) {
                res.json(propietario);
                res.render('pages/propietarios' , {propietario})
            } else {
                res.status(404).json({ message: 'Propietario no encontrado' });
            }
        } catch (error) {
            console.error('Error al obtener el propietario:', error);
            res.status(500).json({ error: 'Error al obtener el propietario' + error.message });
        }
    }

    static async createPropietarrio(req, res) {
        const nuevoPropietario = req.body;
        try {
            const id = await Propietario.create(nuevoPropietario);
            res.status(201).json({ id: id[0] });
            res.render('pages/propietarios' , {propietario})
        } catch (error) {
            console.error('Error al crear el propietario:', error);
            res.status(500).json({ error: 'Error al crear el propietario' + error.message });
            res.status(500).render('pages/error', { error: 'Error al crear el propietario' });
        }
    }

    static async updatePropietario(req, res) {
        const id = req.params.id;
        const propietarioActualizado = req.body;
        try {
            const filasActualizadas = await Propietario.update(id, propietarioActualizado);
            if (filasActualizadas) {
                res.json({ message: 'Propietario actualizado' });
                res.render('pages/propietarios' , {propietario})
            } else {
                res.status(404).json({ message: 'Propietario no encontrado' });
            }
        } catch (error) {
            console.error('Error al actualizar el propietario:', error.message);
            res.status(500).json({ error: 'Error al actualizar el propietario' + error.message });
            res.status(500).render('pages/error', { error: 'Error al actualizar el propietario' });
        }
    }

    static async deletePropietario(req, res) {
        const id = req.params.id;
        try {
            const filasEliminadas = await Propietario.delete(id);
            if (filasEliminadas) {
                res.json({ message: 'Propietario eliminado' });
                res.render('pages/propietarios' , {propietario})
            } else {
                res.status(404).json({ message: 'Propietario no encontrado' });
            }
        } catch (error) {
            console.error('Error al eliminar el propietario:', error);
            res.status(500).json({ error: 'Error al eliminar el propietario' + error.message });
        }
    }
}

export default PropietarioController;