import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import propietarioRouter from './routes/propietarioRouter.js';
import RecepcionRouter from './routes/recepcionRoutes.js';
import { PropietarioController } from './controllers/propietarioController.js';

async function startServer() {
  
  const app = express();
  const port = 3000;

  app.use(cors());
  app.use(bodyParser.json());

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
  app.use('/propietarios', propietarioRouter);
  app.use('/api', RecepcionRouter);

  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });
}

startServer();