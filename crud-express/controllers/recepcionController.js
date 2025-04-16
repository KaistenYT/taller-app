const Recepcion = require('../model/recepcion');


class RecepcionController{

    static async getAllRecepcion(req, res){
        try{
            const recepcion = await Recepcion.getAll();
            res.json(recepcion);
        }catch(error){
            console.error('Error al obtener las Recepciones:', error)
            res.status(500).json({error: 'Error al obtener los equipos de la base de datos'} )
        }
    }

    static async getRecepcionById(req, res){
        const id = req.params.id;
        try{
            const recepcion = await Recepcion.getById(id);
            if(recepcion){
                res.json(recepcion)
            }else{
                res.status(404).json({message: 'Recepcion no encontrada'})
            }
        }catch(error){
            console.error('Error al obtener la recepcion de la base de datos:', error)
        }

    }
    static async createRecepcion(req, res) {
        const { idEquipo, idPropietario, estado } = req.body;
        const fechaRecepcion = new Date(); 

        try {
            const [idRecepcion] = await Recepcion.create({
                fechaRecepcion: fechaRecepcion,
                idEquipo: idEquipo,
                idPropietario: idPropietario,
                estado: estado
            });

            const newRecepcion = await Recepcion.getById(idRecepcion);
            res.status(201).json(newRecepcion);
        } catch (error) {
            console.error('Error al crear la recepción:', error);
            res.status(500).json({ message: 'Error al crear la recepción' });
        }
    }

    static async updateRecepcion(req, res){
        const id = req.params.id
        const { fechaRecepcion, idEquipo, idPropietario, estado } = req.body

        try{
            const updatedRecepcion = await Recepcion.update(id, { fechaRecepcion, idEquipo, idPropietario, estado })
            if(updatedRecepcion){
                res.json({message: 'Recepcion actualizada'})
            }else{
                res.status(404).json({message: 'Recepcion no encontrada'})
            }
        }catch(error){
            console.error('Error al actualizar la recepcion:', error)
            res.status(500).json({message: 'Error al actualizar la recepcion'})
        }
    }

    static async deleteRecepcion(req, res){
        const id = req.params.id
        try{
            const deletedRecepcion = await Recepcion.delete(id)
            if(deletedRecepcion){
                res.json({message: 'Recepcion eliminada'})
            }else{
                res.status(404).json({message: 'Recepcion no encontrada'})
            }
        }catch(error){
            console.error('Error al eliminar la recepcion:', error)
            res.status(500).json({message: 'Error al eliminar la recepcion'})
        }
    }
    static async getRecepcionByPropietario(req, res){
        const idPropietario = req.params.idPropietario
        try{
            const recepcion = await Recepcion.getRecepcionByPropietario(idPropietario)
            if(recepcion){
                res.json(recepcion)
            }else{
                res.status(404).json({message: 'Recepcion no encontrada'})
            }
        }catch(error){
            console.error('Error al obtener la recepcion de la base de datos:', error)
        }
    }
    static async getRecepcionByEquipo(req, res){
        const idEquipo = req.params.idEquipo
        try{
            const recepcion = await Recepcion.getRecepcionByEquipo(idEquipo)
            if(recepcion){
                res.json(recepcion)
            }else{
                res.status(404).json({message: 'Recepcion no encontrada'})
            }
        }catch(error){
            console.error('Error al obtener la recepcion de la base de datos:', error)
        }
    }
    static async getRecepcionByEstado(req, res){
        const estado = req.params.estado
        try{
            const recepcion = await Recepcion.getRecepcionByEstado(estado)
            if(recepcion){
                res.json(recepcion)
            }else{
                res.status(404).json({message: 'Recepcion no encontrada'})
            }
        }catch(error){
            console.error('Error al obtener la recepcion de la base de datos:', error)
        }
    }
    static async getRecepcionByFecha(req, res){
        const fechaRecepcion = req.params.fechaRecepcion
        try{
            const recepcion = await Recepcion.getRecepcionByFecha(fechaRecepcion)
            if(recepcion){
                res.json(recepcion)
            }else{
                res.status(404).json({message: 'Recepcion no encontrada'})
            }
        }catch(error){
            console.error('Error al obtener la recepcion de la base de datos:', error)
        }
    }




}
module.exports= RecepcionController;