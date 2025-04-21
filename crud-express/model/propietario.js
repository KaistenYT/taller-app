import db from '../config/databaseCon.js';

class Propietario {
    static async getAll() {
        return await db('propietario').select('*');
    }

    static async getById(id) {
        return await db('propietario').where('idPropietario', id).first();
    }

    static async create(propietario) {
        return await db('propietario').insert(propietario);
    }

    static async update(id, propietario) {
        return await db('propietario').where('idPropietario', id).update(propietario);
    }

    static async delete(id) {
        return await db('propietario').where('idPropietario', id).del();
    }
}

export default Propietario;