import type {
  IMetricResponse,
  IAverageResponse,
  IMetricNamesResponse,
  IBaseMetric
} from '../types';

export const metric: IBaseMetric = {
  name: 'age',
  value: 10,
};

export const metricNames: IMetricNamesResponse[] = [
  {
    _id: '62b7c08c4b9a9273e0021764',
    name: 'age',
  },
  {
    _id: '62b7c08c4b9a9273e0033333',
    name: 'weight',
  }
];

export const metrics: IMetricResponse = {
  metrics: [
    {
      _id: '62b7c08c4b9a9273e4444444',
      name: 'age',
      value: 10,
      createdAt: `${new Date()}`,
      updatedAt: `${new Date()}`,
    },
    {
      _id: '62b7c08c4b9a9273e0033333',
      name: 'weight',
      value: 30,
      createdAt: `${new Date()}`,
      updatedAt: `${new Date()}`,
    },
    {
      _id: '62b7c08c4b9a9273e0055555',
      name: 'height',
      value: 15,
      createdAt: `${new Date()}`,
      updatedAt: `${new Date()}`,
    }
  ],
  pagination: {
    limit: 2,
    page: 1,
    pageSize: 2,
    pageCount: 2,
    totalCount: 3,
  }
};

export const average: IAverageResponse = {
  lastMin: 23.45,
  lastHour: 18.00,
  lastDay: 17.62,
};
