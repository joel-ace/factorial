import { createContext } from 'react';
import { IMetricNamesResponse } from '../api';

export interface IMetricNamesContext {
    readonly selectedMetric: string;
    readonly setSelectedMetric: React.Dispatch<React.SetStateAction<string>>;
    readonly metricNames?: IMetricNamesResponse[];
    readonly isLoading: boolean;
    readonly isError: boolean;
};

const MetricNamesContext = createContext<IMetricNamesContext | undefined>(undefined);

export { MetricNamesContext };
