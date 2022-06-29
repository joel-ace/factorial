import express from 'express';
import {
  createMetric,
  getMetrics,
  getMetricNames,
  getAverages,
} from '../controller';
import { validate, schemas } from '../middleware/validate';

const Router = express.Router();

Router.route('/')
  .get((req, res) => {
    return res.status(200).json({
      message: 'Welcome to metrics API',
    });
  });

Router.route('/metrics')
  .post(validate(schemas.create, 'body'), createMetric)
  .get(validate(schemas.get, 'query'), getMetrics);

  Router.route('/metric-names')
  .get(getMetricNames);


Router.route('/average/:name')
  .get(validate(schemas.average, 'params'), getAverages)

export default Router;
