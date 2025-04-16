const Equipo = require ('../model/equipo');

class EquipoController{

    static async getAllEquipos(req, res){
        try{
            const equipos = await Equipo.getAll();
            res.json(equipos);
        }catch(error){
            console.error('Error al obtener los equipos:', error)
            res.status(500).json({error: 'Error al obtener los equipos'})
        }
    }

    static async getEquipoById(req, res){
        const id = req.params.id;
        try{
            const equipo = await Equipo.getById(id);
            if(equipo){
                res.json(equipo);
            }else{
                res.status(404).json({message: 'Equipo no encontrado'})
            }
        }catch(error){
            console.error('Error al obtener el equipo:', error)
            res.status(500).json({error: 'Error al obtener el equipo'})
        }
    }
    static async createEquipo(req, res){
        const nuevoEquipo = req.body;
        try{
            const id = await Equipo.create(nuevoEquipo);
            res.status(201).json({id: id[0]});
        }catch(error){
            console.error('Error al crear el equipo:', error)
            res.status(500).json({error: 'Error al crear el equipo' + error.message})
        }
    }
    static async updateEquipo(req, res){
        const id = req.params.id;
        const equipoActualizado = req.body;
        try{
            const filasActualizadas = await Equipo.update(id, equipoActualizado);
            if(filasActualizadas){
                res.json({message: 'Equipo actualizado'});
            }else{
                res.status(404).json({message: 'Equipo no encontrado'});
            }
        }catch(error){
            console.error('Error al actualizar el equipo:', error)
            res.status(500).json({error: 'Error al actualizar el equipo'})
        }
    }
    static async deleteEquipo(req, res){
        const id = req.params.id;
        try{
            const filasEliminadas = await Equipo.delete(id);
            if(filasEliminadas){
                res.json({message: 'Equipo eliminado'});
            }else{
                res.status(404).json({message: 'Equipo no encontrado'});
            }
        }catch(error){
            console.error('Error al eliminar el equipo:', error)
            res.status(500).json({error: 'Error al eliminar el equipo'})
        }
    }
}
module.exports = EquipoController;