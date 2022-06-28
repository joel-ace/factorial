import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accept: 'application/json',
  },
});

export interface IGetMetricQueryParams {
  name?: string;
  page?: number;
  limit?: number;
};

export interface ICreateMetricParams {
  name: string;
  value: number;
};

export interface IMetricResponse {
  _id: string;
  name: string;
  value: number;
  createdAt: Date;
  updatedAt: Date;
};

export interface IAverageResponse {
  lastMin: number;
  lastHour: number;
  lastDay: number;
};

export interface IMetricNamesResponse {
  _id: number;
  name: string;
};

export const createMetric = async (params: ICreateMetricParams) => {
  const response = await api.post('/metrics', { ...params });
  return response.data.newMetric;
};

export const getMetrics = async (queryParams?: IGetMetricQueryParams): Promise<IMetricResponse> => {
  const response = await api.get('/metrics', {
    params: queryParams,
  });
  return response.data.metrics;
};

export const getMetricNames = async (): Promise<IMetricNamesResponse[]> => {
  const response = await api.get('/metric-names');
  return response.data.metricNames;
};

export const getAverages = async (name: string): Promise<IAverageResponse> => {
  const response = await api.get(`/average/${name}`);
  return response.data.average;
};
