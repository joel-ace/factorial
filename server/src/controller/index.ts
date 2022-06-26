import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Metric from '../models/Metric';
import MetricName from '../models/MetricName';
import { handleError, generateAverageQuery } from '../utilities/utils';

export const createMetric = async (req: Request, res: Response, next: NextFunction) => {
  const { name, value } = req.body;

  const metric = new Metric({
    name,
    value,
    _id: new mongoose.Types.ObjectId()
  });

  const metricName = new MetricName({ name, _id: new mongoose.Types.ObjectId() });

  try {
    const newMetric = await metric.save();
    const metricNameInDb = await MetricName.findOne({ name });
    if (!metricNameInDb) {
      metricName.save();
    }
    return res.status(201).send({ newMetric });
  } catch (error: any) {
    handleError(res, error.message);
  }
};

export const getMetrics = async (req: Request, res: Response, next: NextFunction) => {
  let page = 0;
  let limit = 20;
  const findQuery = {};

  if (req.query.page || req.query.limit) {
    page = Number(req.query.page);
    limit = Number(req.query.limit);
  }

  if (req.query.name) {
    findQuery['name'] = req.query.name;
  }

  const offset = page > 0 ? (( page - 1 ) * limit) : 0;

  try {
    const metrics = await Metric.find(findQuery).skip(offset).limit(limit);
    return res.status(200).send({ data: metrics });
  } catch (error: any) {
    handleError(res, error.message);
  }
};

export const getMetricNames = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const metricNames = await MetricName.find();
    return res.status(200).send({ data: metricNames });
  } catch (error: any) {
    handleError(res, error.message);
  }
};

export const getAverages = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params;
  const oneDayAgo = new Date(Date.now() - (24 * 60 * 60 * 1000));
  const oneMinAgo = new Date(Date.now() - (60 * 1000));
  const oneHourAgo = new Date(Date.now() - (60 * 60 * 1000));

  if (!name) {
    return res.status(400).send({ message: 'You need a metric name to get averages' });
  }

  const averages = await Metric.aggregate(
    [
      {
        '$facet': {
          lastMin: generateAverageQuery(name, oneMinAgo),
          lastHour: generateAverageQuery(name, oneHourAgo),
          lastDay: generateAverageQuery(name, oneDayAgo),
        }
      }
    ]
  );

  return res.status(200).send({
    data: {
      lastMin: averages[0].lastMin[0]?.average || 0,
      lastHour: averages[0].lastHour[0]?.average || 0,
      lastDay: averages[0].lastDay[0]?.average || 0,
    }
  });
};
