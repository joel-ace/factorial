import { FC, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { MetricNamesContext } from './MetricNamesContext';
import { getMetricNames } from '../api';

interface IProps {
  children: React.ReactNode;
};

const MetricNamesProvider: FC<IProps> = ({ children }): React.ReactElement => {
  const [selectedMetric, setSelectedMetric] = useState('');
  const { data, isLoading, isError } = useQuery('metric-names', getMetricNames);

  const metricNamesContextValue = useMemo(() => ({
    selectedMetric,
    setSelectedMetric,
    isLoading,
    isError,
    metricNames: data,
  }), [selectedMetric, setSelectedMetric, data, isLoading, isError]);

  return (
    <MetricNamesContext.Provider value={metricNamesContextValue}>
      {children}
    </MetricNamesContext.Provider>
  )
};

export { MetricNamesProvider } ;
