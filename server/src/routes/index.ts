import express from 'express';
import {
  createMetric,
  getMetrics,
  getMetricNames,
  getAverages,
} from '../controller';

const Router = express.Router();

Router.route('/')
  .get((req, res) => {
    return res.status(200).json({
      message: 'Welcome to metrics API',
    });
  });

Router.route('/metrics')
  .post(createMetric)
  .get(getMetrics);

  Router.route('/metric-names')
  .get(getMetricNames);


Router.route('/average/:name')
  .get(getAverages)

export default Router;
