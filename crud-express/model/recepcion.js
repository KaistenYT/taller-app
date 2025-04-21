import db from '../config/databaseCon.js';

class Recepcion {
    static async getAll() {
        return await db('recepcion')
            .join('propietario', 'recepcion.idPropietario', '=', 'propietario.idPropietario')
            .select('recepcion.*', 'propietario.descripcion as nombrePropietario');
    }

    static async getById(id) {
        return await db('recepcion')
            .join('propietario', 'recepcion.idPropietario', '=', 'propietario.idPropietario')
            .where('idRecepcion', id)
            .first();
    }

    static async create(recepcion) {
        return await db('recepcion').insert(recepcion);
    }

    static async update(id, recepcion) {
        return await db('recepcion').where('idRecepcion', id).update(recepcion);
    }

    static async delete(id) {
        return await db('recepcion').where('idRecepcion', id).del();
    }

    static async getByPropietario(idPropietario) {
        return await db('recepcion')
            .where('idPropietario', idPropietario)
            .select('*');
    }
}

export default Recepcion;