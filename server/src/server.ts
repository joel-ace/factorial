import express from 'express';
import mongoose from 'mongoose';
import { config } from './config';
import routes from './routes';

const app = express();

mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => { 
    startServer();
  })
  .catch(() => {console.log('error')});

const startServer = () => {
  app.use(express.urlencoded({
    extended: false
  }));

  app.use(express.json());

  app.use('/api', routes);
  
  app.use('*', (req, res) => (
    res.status(404).send({
      message: 'this resource does not exist',
    })
  ));
  
  if (process.env.NODE_ENV !== 'test') {
    app.listen(config.SERVER_PORT);
  }
};

export default app;
