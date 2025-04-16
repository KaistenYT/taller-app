async function startServer() {
  const knex =('./config/databaseCon');
  const express = require('express');
  const bodyParser = require('body-parser');
  const equiposRouter = require('./routes/equiposRouter'); // Asegúrate del nombre correcto

  const app = express();
  const port = 3000;

  app.use(bodyParser.json());
  app.use('/api', equiposRouter);

  app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
  });
}

startServer();