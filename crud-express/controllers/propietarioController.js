const Propietario = require ('../model/propietario')

class PropietarioController{
    static async getAllPropietarios(req , res){
        try {
            const propietarios = await  Propietario.getAll();
            res.json(propietarios);
        }catch (error){
            console.error('Error al obtener los propietarios:', error)
            res.status(500).json({error: 'Error al obtener los propietarios'})
        }
    }

    static async getPropietarioById(req,res){
        const id = req.params.id;
        try{
            const propietario = await Propietario.getById(id);
            if(propietario){
                res.json(propietario)
            }else{
                res.status(404).json({message:'Propietario no encontrado'})
            }
        }catch(error){
            console.error('Error al obtener el propietario:', error)
            res.status(500).json({error:'Error al obtener el propietario' + error.message})
        }
    }

    static async createPropietarrio(req,res){
        const nuevoPropietario = req.body;
        try{
            const id = await Propietario.create(nuevoPropietario);
            res.status(201).json({id : id[0]});
            
        }catch(error){
            console.error('Error al crear el propietario:', error)
            res.status(500).json({error:'Error al crear el propietario' + error.message})
        }
    }

    static async updatePropietario(req,res){
        const id = req.params.id;
        const propietarioActualizado = req.body;
        try{
            const filasActualizadas = await Propietario.update(id,propietarioActualizado)
            if(filasActualizadas){
                res.json({message: 'Propietario actualizado'})
            }else{
                res.status(404).json({message: 'Propietario no encntrado'})
            }
        }catch (error){
            console.error('Error al actualizar el propietario:',  error.message)
            res.status(500).json({error:'Error al actualizar el propietario'+ error.message})
        }
    }

    static async deletePropietario(req,res){
        const id = req.params.id;
        try{
            const filasEliminadas = await Propietario.delete(id);
            if(filasEliminadas){
                res.json({message: 'Propietario eliminado'})
            }else{
                res.status(404).json({message: 'Propietario no encontrado'})
            }
        }catch(error){
            console.error('Error al eliminar el propietario:', error)
            res.status(500).json({error:'Error al eliminar el propietario' + error.message})
        }
    }
}

module.exports= PropietarioController;