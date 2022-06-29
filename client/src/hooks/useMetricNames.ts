import { useContext } from 'react';
import { MetricNamesContext } from '../context/MetricNamesContext';

import type { IMetricNamesContext } from '../types';

const useMetricNames = (): IMetricNamesContext => {
  const context = useContext(MetricNamesContext);

  if (context === undefined) {
    throw new Error('useMetricNames must be used within MetricNamesProvider');
  }

  return context;
};

export { useMetricNames };
