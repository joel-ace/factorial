import React from 'react';
import { RequestStateWrapper } from '../common/RequestStateWrapper';
import { useMetricNames } from '../../hooks';

import type { IMetricNamesResponse } from '../../types';

import './MetricNames.css';

const MetricNames = () => {
  const {
    metricNames = [],
    selectedMetric,
    isLoading,
    isError,
    setSelectedMetric
  } = useMetricNames();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMetric(event.target.value);
  };

  return (
    <div className='metric-names-wrapper'>
        <RequestStateWrapper isLoading={isLoading} isError={isError}>
          <div className="input-wrapper">
            <label htmlFor="metricNamesSelect" className="select-input">Select metric name</label>
            <select data-testid="metric-names-select" value={selectedMetric} name="metric-names-input" id="metricNamesSelect" onChange={handleSelectChange}>
              <option value=''>All Metrics</option>
              {metricNames.map((metric: IMetricNamesResponse) => (
                <option 
                  key={metric._id} 
                  value={metric.name}
                >
                  {metric.name}
                </option>
              ))}
            </select>
          </div>
        </RequestStateWrapper>
      </div>
  )
}

export { MetricNames };