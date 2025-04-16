const knex = require('../config/databaseCon')


class Propietario{
    static async getAll(){
        return knex('propietario').select('*')
    }

    static async getById(idPropietario){
        return knex('propietario').where('idPropietario', idPropietario).first();

    }

    static async create(propietario){
        return knex('propietario').insert(propietario)
    }

    static async update(idPropietario, propietario){
        return knex('propietario').where('idPropietario', idPropietario).update(propietario)
    }

    static async delete(idPropietario){
        return knex ('propietario').where('idPropietario', idPropietario).del()
    }
}

module.exports= Propietario;