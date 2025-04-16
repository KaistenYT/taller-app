const knex = require('../config/databaseCon')

class Equipo{
    static async getAll(){
        return knex('equipos').select('*')
    }

    static async getById(idEquipo){
        return knex('equipos').where('idEquipo', idEquipo).first();

    }

    static async create(equipo){
        return knex('equipos').insert(equipo)
    }

    static async update(idEquipo, equipo){
        return knex('equipos').where('idEquipo', idEquipo).update(equipo)
    }

    static async delete(idEquipo){
        return knex ('equipos').where('idEquipo', idEquipo).del()
    }
}
module.exports= Equipo;