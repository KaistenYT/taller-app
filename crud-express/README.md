# crud-express

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.9. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.



<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Equipos</title>
    <style>
        body {
            font-family: sans-serif;
        }
        #lista-equipos ul {
            list-style-type: none;
            padding: 0;
        }
        #lista-equipos li {
            border: 1px solid #ccc;
            margin-bottom: 5px;
            padding: 8px;
        }
        #mensaje-error {
            color: red;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <h1>Lista de Equipos</h1>

    <button id="boton-listar-equipos">Mostrar Equipos</button>

    <div id="lista-equipos">
        </div>

    <div id="mensaje-error">
        </div>

    <script>
        async function listarEquipos() {
            const listaEquiposElement = document.getElementById('lista-equipos');
            const mensajeErrorElement = document.getElementById('mensaje-error');

            // Limpiar mensajes de error y lista anterior
            mensajeErrorElement.textContent = '';
            listaEquiposElement.innerHTML = 'Cargando equipos...';

            try {
                const response = await fetch('/api/equipos', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    const equipos = await response.json();
                    mostrarEquiposEnInterfaz(equipos);
                } else {
                    mensajeErrorElement.textContent = `Error al obtener la lista de equipos: ${response.status}`;
                    listaEquiposElement.innerHTML = ''; // Limpiar el "Cargando..."
                    console.error('Error al obtener la lista de equipos:', response.status);
                }
            } catch (error) {
                mensajeErrorElement.textContent = 'Error de conexión con el servidor.';
                listaEquiposElement.innerHTML = ''; // Limpiar el "Cargando..."
                console.error('Error de red al obtener la lista de equipos:', error);
            }
        }

        function mostrarEquiposEnInterfaz(equipos) {
            const listaEquiposElement = document.getElementById('lista-equipos');
            listaEquiposElement.innerHTML = ''; // Limpiar el "Cargando..."

            if (equipos && equipos.length > 0) {
                const ul = document.createElement('ul');
                equipos.forEach(equipo => {
                    const li = document.createElement('li');
                    li.textContent = `ID: ${equipo.idEquipo}, Marca: ${equipo.marca}, Modelo: ${equipo.modelo}, Observación: ${equipo.observacion}`;
                    ul.appendChild(li);
                });
                listaEquiposElement.appendChild(ul);
            } else {
                listaEquiposElement.textContent = 'No hay equipos registrados.';
            }
        }

        // Obtener el botón y agregar el listener para llamar a listarEquipos al hacer clic
        const botonListar = document.getElementById('boton-listar-equipos');
        if (botonListar) {
            botonListar.addEventListener('click', listarEquipos);
        }

        // Opcional: Puedes llamar a listarEquipos() directamente aquí si quieres que se cargue al cargar la página
        // listarEquipos();
    </script>
</body>
</html>