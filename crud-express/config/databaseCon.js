import knex from 'knex';

const db = knex({
    client: 'sqlite3', 
    connection: {
      filename: './mydb.sqlite',
    },
});

// Crear la tabla propietario
async function createPropietarioTable() {
    const exists = await db.schema.hasTable('propietario');
    if (!exists) {
        await db.schema.createTable('propietario', (table) => {
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
    const exists = await db.schema.hasTable('recepcion');
    if (!exists) {
        await db.schema.createTable('recepcion', (table) => {
            table.increments('idRecepcion').primary()
            table.date('fechaRecepcion')
            table.string('descripcionEquipo')
            table.string('falla')
            table.string('observacion')
            table.integer('idPropietario').unsigned().references('idPropietario').inTable('propietario');
            table.string('estado');
        });
        console.log("Tabla 'recepcion' creada");
    } else {
        console.log("Tabla 'recepcion' ya existe");
    }
}

async function createInitialTables() {
    await createPropietarioTable();
    await createRecepcionTable();
}

createInitialTables();

export default db;