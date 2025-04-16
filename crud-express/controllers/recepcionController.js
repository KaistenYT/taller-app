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
        const { idPropietario, estado } = req.body;
        const fechaRecepcion = new Date(); 

        try {
            const [idRecepcion] = await Recepcion.create({
                fechaRecepcion: '/'+ fechaRecepcion.setDate() + '/' + (fechaRecepcion.setMonth() + 1 + '/' + fechaRecepcion.setFullYear()),
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
        const id = req.params.id;
        const recepcionActualizada = req.body;
        try{
            const filasActualizadas = await Recepcion.update(id, recepcionActualizada)
            if(filasActualizadas){
                res.json({message: 'Recepcion actualizada'})
            }else{
                res.status(404).json({message: 'Recepcion no encontrada'})
            }
        }catch(error){
            console.error('Error al actualizar la recepcion:', error.message)
            res.status(500).json({error:'Error al actualizar la recepcion' + error.message})
        }
    }
    static async deleteRecepcion(req, res){
        const id = req.params.id;
        try{
            const filasEliminadas = await Recepcion.delete(id);
            if(filasEliminadas){
                res.json({message: 'Recepcion eliminada'})
            }else{
                res.status(404).json({message: 'Recepcion no encontrada'})
            }
        }catch(error){
            console.error('Error al eliminar la recepcion:', error.message)
            res.status(500).json({error:'Error al eliminar la recepcion' + error.message})
        }
    }


}
module.exports= RecepcionController;