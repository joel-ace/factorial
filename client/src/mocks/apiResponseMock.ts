import { rest } from 'msw';
import {
  metric,
  metrics,
  metricNames,
  average
} from './metrics';

export const generateMockResponse = (status: number, data: any, ctx: any, res: any) => {
  return res(
    ctx.status(status),
    ctx.json(data)
  );
};

const createMetric = (req: any, res: any, ctx: any) => generateMockResponse(201, { metric }, ctx, res);
const getMetrics = (req: any, res: any, ctx: any) => generateMockResponse(200, metrics, ctx, res);
const getMetricNames = (req: any, res: any, ctx: any) => generateMockResponse(200, { metricNames }, ctx, res);
const getAverages = (req: any, res: any, ctx: any) => generateMockResponse(200, { average }, ctx, res);

export const handlers = [
  rest.post('*/metrics', createMetric),
  rest.get('*/metrics', getMetrics),
  rest.get('*/metric-names', getMetricNames),
  rest.get('*/average/*', getAverages),
];
