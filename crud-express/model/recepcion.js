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
    static async getRecepcionByPropietario(idPropietario){
        return knex('recepcion').where('idPropietario', idPropietario).select('*')
    }
    static async getRecepcionByEquipo(idEquipo){
        return knex('recepcion').where('idEquipo', idEquipo).select('*')
    }
    static async getRecepcionByEstado(estado){
        return knex('recepcion').where('estado', estado).select('*')
    }
    static async getRecepcionByFecha(fechaRecepcion){
        return knex('recepcion').where('fechaRecepcion', fechaRecepcion).select('*')
    }
}

module.exports = Recepcion;