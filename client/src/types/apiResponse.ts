import type { IMetric } from './metric';

export interface IMetricResponse {
  metrics: IMetric[],
  pagination: {
    limit: number;
    page: number,
    pageSize: number,
    pageCount: number,
    totalCount: number,
  };
};

export interface IAverageResponse {
  lastMin: number;
  lastHour: number;
  lastDay: number;
};

export interface IMetricNamesResponse {
  _id: string;
  name: string;
};