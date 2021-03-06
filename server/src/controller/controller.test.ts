import Metric from '../models/Metric';
import MetricName from '../models/MetricName';
import {
  createMetric,
  getMetrics,
  getMetricNames,
  getAverages,
} from './index';
import { createMetricResponse, averageResponse, req, res } from '../testData';

const next = jest.fn();

describe('getMetricNames', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('createMetric', () => {
    let metricSpy;
    let findOneSpy;
    let metricNameSpy;
    
    beforeEach(() => {
      metricSpy = jest.spyOn(Metric.prototype, 'save').mockImplementation(jest.fn());
      findOneSpy = jest.spyOn(MetricName, 'findOne').mockImplementation(jest.fn());
      metricNameSpy = jest.spyOn(MetricName.prototype, 'save').mockImplementation(jest.fn());

      req.body.name = createMetricResponse[0].name;
      req.body.value = createMetricResponse[0].value;
    });
  
    it('calls the db models to save data', async () => {

      // @ts-expect-error
      await createMetric(req, res, next);

      expect(metricSpy).toHaveBeenCalled();
      expect(findOneSpy).toHaveBeenCalled();
      expect(metricNameSpy).toHaveBeenCalled();
    });

    it('returns the correct response data', async () => {
      jest.spyOn(Metric.prototype, 'save').mockImplementation(() => createMetricResponse);

      // @ts-expect-error
      const response = await createMetric(req, res, next);

      // @ts-expect-error
      expect(response.status).toEqual(201);
      // @ts-expect-error
      expect(response.metric).toEqual(createMetricResponse);
    });
  });

  describe('getMetricNames', () => {
    it('fetches metric names', async () => {
      const findSpy = jest.spyOn(MetricName, 'find')
      // @ts-expect-error
        .mockImplementation(() => ({
          sort: jest.fn()
        }));

      // @ts-expect-error
      await getMetricNames(req, res, next);

      expect(findSpy).toHaveBeenCalled();
    });
  });

  describe('getAverages', () => {
    it('should not make a query if there is no name param', async () => {
      const averageSpy = jest.spyOn(Metric, 'aggregate').mockImplementation(jest.fn());

      // @ts-expect-error
      const response = await getAverages(req, res, next);

      expect(averageSpy).not.toHaveBeenCalled();
      expect(response.status).toEqual(400);
      // @ts-expect-error
      expect(response.message).toEqual('You need a metric name to get averages');
    });

    it('should query for average values if there is a name param', async () => {
      req.params.name = 'age';
      // @ts-expect-error
      jest.spyOn(Metric, 'aggregate').mockImplementation(() => averageResponse);

      // @ts-expect-error
      const response = await getAverages(req, res, next);

      expect(response.status).toEqual(200);
      // @ts-expect-error
      expect(response.average).toEqual({
        lastMin: averageResponse[0].lastMin[0]?.average,
        lastHour: averageResponse[0].lastHour[0]?.average,
        lastDay: averageResponse[0].lastDay[0]?.average,
      });
    });
  });

  describe('getMetrics', () => {
    it('should query for metrics if no query string is provided', async () => {
      const aggregateSpy = jest.spyOn(Metric, 'aggregate').mockImplementation(jest.fn());

      // @ts-expect-error
      await getMetrics(req, res, next);

      expect(aggregateSpy).toHaveBeenCalled();
    });
  });
});
