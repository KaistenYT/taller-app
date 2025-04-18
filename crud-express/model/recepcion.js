const knex = require('../config/databaseCon')

class Recepcion{
    static async getAll(){
        return knex('recepcion').select('*')
    }

    static async getById(idRecepcion){
        return knex('recepcion').where('idRecepcion', idRecepcion).first();
    }

    static async create(recepcion){
        return knex('recepcion').insert(recepcion)
    }

    static async update(idRecepcion, recepcion){
        return knex('recepcion').where('idRecepcion', idRecepcion).update(recepcion)
    }

    static async delete(idRecepcion){
        return knex ('recepcion').where('idRecepcion', idRecepcion).del()
    }
 
}

module.exports = Recepcion;