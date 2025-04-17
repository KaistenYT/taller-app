async function startServer() {
  
  const express = require('express');
  const bodyParser = require('body-parser');
 
  const propietarioRouter = require('./routes/propietarioRouter')
  const RecepcionRouter = require('./routes/recepcionRoutes')
  const cors = require('cors')

  

  const app = express();
  const port = 3000;


  app.use(cors())
  app.use(bodyParser.json());

  app.set('view engine', 'ejs')

  app.get('/', (req, res)=>{
    res.render('pages/index.ejs')
  })


  app.use('/api', propietarioRouter)
  app.use('/api', RecepcionRouter)

  app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
  });
}

startServer();