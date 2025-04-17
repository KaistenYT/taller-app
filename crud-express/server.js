async function startServer() {
  
  const express = require('express');
  const bodyParser = require('body-parser');
 
  const propietarioRouter = require('./routes/propietarioRouter')
  const RecepcionRouter = require('./routes/recepcionRoutes')

  const app = express();
  const port = 3000;

  app.use(bodyParser.json());

  app.use('/api', propietarioRouter)
  app.use('/api', RecepcionRouter)

  app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
  });
}

startServer();