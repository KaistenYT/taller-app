import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import propietarioRouter from './routes/propietarioRouter.js';
import recepcionRouter from './routes/recepcionRoutes.js';
import { PropietarioController } from './controllers/propietarioController.js';

async function startServer() {
  const app = express();
  const port = 3000;

  // Middlewares
  app.use(cors());
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true }));

  // Configuración de vistas
  app.set('view engine', 'ejs');

  // Ruta principal
  app.get('/', async (req, res) => {
    try {
      const propietarios = await PropietarioController.getPropietariosData();
      res.render('pages/index.ejs', {
        nombre: 'Usuario',
        items: ['Item 1', 'Item 2', 'Item 3'],
        propietarios: propietarios
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).render('pages/error', { error: 'Error al cargar los propietarios' });
    }
  });

  // Rutas de propietarios
  app.use('/propietarios', propietarioRouter); // Para vistas
  app.use('/api/propietarios', propietarioRouter); // Para API

  // Rutas de recepciones
  app.use('/recepciones', recepcionRouter); // Para vistas
  app.use('/api/recepciones', recepcionRouter); // Para API

  // Manejo de errores
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
  });

  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });
}

startServer();