import React from 'react';
import { Average } from '../average/Average';
import { RequestStateWrapper } from '../common/RequestStateWrapper';
import { useGetAverages, useMetricNames } from '../../hooks';
import './MetricAverages.css';

const MetricAverages = () => {
  const { selectedMetric } = useMetricNames();
  const { data, isLoading, isError } = useGetAverages({
    name: selectedMetric,
    enabled: !!selectedMetric,
  });

  if (!selectedMetric) {
    return <div className="average-wrapper center-text">Select a metric name to view the average for that metric</div>
  }

  return (
    <div
      className="average-wrapper"
      {...isLoading || isError ? { style: { justifyContent: 'center' }} : {}}
    >
      <RequestStateWrapper isLoading={isLoading} isError={isError}>
        <Average name="Last Min" average={data?.lastMin} />
        <Average name="Last Hour" average={data?.lastHour} />
        <Average name="Last 24 hours" average={data?.lastDay} />
      </RequestStateWrapper>
    </div>
    );
};

export { MetricAverages };
