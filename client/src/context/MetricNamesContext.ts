import { createContext } from 'react';
import type { IMetricNamesContext } from '../types';

const MetricNamesContext = createContext<IMetricNamesContext | undefined>(undefined);

export { MetricNamesContext };
