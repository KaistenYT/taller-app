let knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: "root",
        password: 'Nyx7811@',
        // database:'nueva_base_de_datos' // Comentamos esto por ahora
    }
});

const databaseName = 'nueva_base_de_datos';

async function createDatabaseAndTables() {
    try {
        // 1. Crear la base de datos (si no existe)
        await knex.raw(`CREATE DATABASE IF NOT EXISTS ??`, [databaseName]);
        console.log(`Base de datos '${databaseName}' creada exitosamente (si no existía).`);

        // 2. Cambiar la conexión para usar la nueva base de datos
        knex.destroy(); // Destroy the old connection
        knex = require('knex')({
            client: 'mysql2',
            connection: {
                host: '127.0.0.1',
                port: 3306,
                user: "root",
                password: 'Nyx7811@',
                database: databaseName
            }
        });

        // 3. Crear las tablas
        await createEquiposTable();
        await createPropietarioTable();
        await createRecepcionTable();

    } catch (error) {
        console.error('Error durante la creación de la base de datos o las tablas:', error);
    } finally {
        await knex.destroy(); // Cierra la conexión al final
    }
}

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

createDatabaseAndTables();