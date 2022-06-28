import React, { useState, useEffect } from 'react';
import { RequestStateWrapper } from '../common/RequestStateWrapper';
import { useGetMetrics, useMetricNames } from '../../hooks';
import './Metrics.css';

const Metrics: React.FC = () => {
  const [page, setPage ] = useState<number>(1);
  const { selectedMetric } = useMetricNames();
  const { data = [], isLoading, isError } = useGetMetrics({
    page,
    name: selectedMetric,
  });
  const heading = `Metrics${selectedMetric ?  ` - [${selectedMetric}]` : ''}`;

  useEffect(() => {
    setPage(1);
  }, [selectedMetric]);

  return (
    <section className="section metrics-section">
      <h2>{heading}</h2>
      <RequestStateWrapper isLoading={isLoading} isError={isError}>
        {data.length ? (
          <div>
            {data.map((metric) => (
              <div className="metric" key={metric._id}>
                <div className="date metric-data">{new Date(metric.createdAt).toLocaleString()}</div>
                <div className="name metric-data">{metric.name}</div>
                <div className="value metric-data">{metric.value}</div>
              </div>
            ))}
            <div className='pagination-buttons-wrapper input-wrapper'>
              <button 
                disabled={page === 1} 
                onClick={() => setPage((prevPage) => prevPage - 1)} 
                type="button" 
                className='submit-button'
              >
                Previous
              </button>
              <button
                onClick={() => setPage((prevPage) => prevPage + 1)} 
                type="button" 
                className='submit-button'
              >
                Next
              </button>
            </div>
          </div>
        ): <p className="center-text">No metric found</p>}
      </RequestStateWrapper>
    </section>
  );
};

export { Metrics };