const knex = require('knex')
({
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        port: 3306,
        user: "root",
        password:'Nyx7811@',
        database:'TALLER_DB'
    }
})

knex.schema.createTableIfNotExists('equipos', function(table){
    table.increments('idEquipo').primary();
    table.string('marca');
    table.string('modelo');
    table.string('observacion');

});

knex.schema.createTableIfNotExists('propietario', function(table){
    table.increments('idPropietario').primary();
    table.string('descripcion');
    table.string('cedula');
    table.string('telefono')
})
knex.schema.createTableIfNotExists('recepcion', function(table){

    table.increments('idRecepcion').primary();
    table.date('fechaRecepcion');
    table.increments('idEquipo').references('idEquipo').inTable('equipos');
    table.increments('idPropietario').references('idPropietario').inTable('propietario');
    table.string('estado')
})