const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host : '127.0.0.1',
        port: 3306,
        user: "root",
        password:'Nyx7811@',
        database:'TALLER_DB'
    }
});



async function createEquiposTable() {
    const exists = await knex.schema.hasTable('equipos');
    if (!exists) {
        await knex.schema.createTable('equipos', (table) => {
            table.increments('idEquipo').primary();
            table.string('marca');
            table.string('modelo');
            table.string('observacion');
        });
        console.log("Tabla 'equipos' creada");
    } else {
        console.log("Tabla 'equipos' ya existe");
    }
}

async function createPropietarioTable() {
    const exists = await knex.schema.hasTable('propietario');
    if (!exists) {
        await knex.schema.createTable('propietario', (table) => {
            table.increments('idPropietario').primary();
            table.string('descripcion');
            table.string('cedula');
            table.string('telefono');
        });
        console.log("Tabla 'propietario' creada");
    } else {
        console.log("Tabla 'propietario' ya existe");
    }
}

async function createRecepcionTable() {
    const exists = await knex.schema.hasTable('recepcion');
    if (!exists) {
        await knex.schema.createTable('recepcion', (table) => {
            table.increments('idRecepcion').primary();
            table.date('fechaRecepcion');
            table.integer('idEquipo').unsigned().references('idEquipo').inTable('equipos');
            table.integer('idPropietario').unsigned().references('idPropietario').inTable('propietario');
            table.string('estado');
        });
        console.log("Tabla 'recepcion' creada");
    } else {
        console.log("Tabla 'recepcion' ya existe");
    }
}

async function createTables() {
    await createEquiposTable();
    await createPropietarioTable();
    await createRecepcionTable();
    await knex.destroy(); 
}

createTables();