const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las peticiones como JSON
app.use(bodyParser.json());

// Datos en memoria (simulando una base de datos)
let items = [];
let nextId = 1;

// --- RUTAS CRUD ---

// Crear un nuevo elemento (CREATE)
app.post('/items', (req, res) => {
  const newItem = {
    id: nextId++,
    name: req.body.name
  };
  items.push(newItem);
  res.status(201).json(newItem); // 201 Created
});

// Leer todos los elementos (READ)
app.get('/items', (req, res) => {
  res.json(items);
});

// Leer un elemento específico por ID (READ)
app.get('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find(item => item.id === itemId);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Elemento no encontrado' }); // 404 Not Found
  }
});

// Actualizar un elemento existente por ID (UPDATE)
app.put('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const itemIndex = items.findIndex(item => item.id === itemId);

  if (itemIndex !== -1) {
    items[itemIndex] = { ...items[itemIndex], ...req.body };
    res.json(items[itemIndex]);
  } else {
    res.status(404).json({ message: 'Elemento no encontrado' });
  }
});

// Eliminar un elemento por ID (DELETE)
app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const initialLength = items.length;
  items = items.filter(item => item.id !== itemId);

  if (items.length < initialLength) {
    res.status(204).send(); // 204 No Content (eliminación exitosa)
  } else {
    res.status(404).json({ message: 'Elemento no encontrado' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});