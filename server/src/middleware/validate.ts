import Joi, { ObjectSchema } from 'joi';
import type { NextFunction, Request, Response } from 'express';
import type { IMetric } from '../models/Metric';

type GetMetricQuery = {
  page?: number;
  limit?: number;
  name?: number; 
};

export const validate = (schema: ObjectSchema, requestPart: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const part = {
      body: req.body,
      params: req.params,
      query: req.query,
    };

    try {
      await schema.validateAsync(part[requestPart]);
      next();
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  };
};

export const schemas = {
  create: Joi.object<IMetric>({
    name: Joi.string().required(),
    value: Joi.number().required(), 
  }),
  get: Joi.object<GetMetricQuery>({
    page: Joi.number(),
    limit: Joi.number(),
    name: Joi.string().optional().allow(''),
  }),
  average: Joi.object<{name: string}>({
    name: Joi.string().required(),
  }),
}
