const knex = require('knex')({
    client: 'sqlite3', 
    connection: {
      filename: './mydb.sqlite',
    },
  });

// Crear la tabla equipos
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

// Crear la tabla propietario
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

// Crear la tabla recepcion
async function createRecepcionTable() {
    const exists = await knex.schema.hasTable('recepcion');
    if (!exists) {
        await knex.schema.createTable('recepcion', (table) => {
            table.increments('idRecepcion').primary();
            table.dateTime('fechaRecepcion');
            table.integer('idEquipo').unsigned().references('idEquipo').inTable('equipos');
            table.integer('idPropietario').unsigned().references('idPropietario').inTable('propietario');
            table.string('estado');
        });
        console.log("Tabla 'recepcion' creada");
    } else {
        console.log("Tabla 'recepcion' ya existe");
    }
}

async function createInitialTables() {
    await createEquiposTable();
    await createPropietarioTable();
    await createRecepcionTable();
    //await knex.destroy(); // Cierra la conexión después de crear las tablas
}

createInitialTables();

module.exports = knex;