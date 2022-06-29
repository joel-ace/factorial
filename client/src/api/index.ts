import axios from 'axios';
import type {
  IMetricResponse,
  IAverageResponse,
  IMetricNamesResponse,
  IBaseMetric,
  IMetric,
  IGetMetricQueryParams,
} from '../types';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accept: 'application/json',
  },
});

export const createMetric = async (params: IBaseMetric): Promise<IMetric> => {
  const response = await api.post('/metrics', { ...params });
  return response.data.metric;
};

export const getMetrics = async (queryParams?: IGetMetricQueryParams): Promise<IMetricResponse> => {
  const response = await api.get('/metrics', {
    params: queryParams,
  });
  const { pagination, metrics } = response.data;
  return { pagination, metrics };
};

export const getMetricNames = async (): Promise<IMetricNamesResponse[]> => {
  const response = await api.get('/metric-names');
  return response.data.metricNames;
};

export const getAverages = async (name: string): Promise<IAverageResponse> => {
  const response = await api.get(`/average/${name}`);
  return response.data.average;
};
