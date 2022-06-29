import { IMetricNamesResponse } from '../types';

export interface IMetricNamesContext {
  readonly selectedMetric: string;
  readonly setSelectedMetric: React.Dispatch<React.SetStateAction<string>>;
  readonly metricNames?: IMetricNamesResponse[];
  readonly isLoading: boolean;
  readonly isError: boolean;
};
