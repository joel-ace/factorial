import React, { useState, useEffect } from 'react';
import { RequestStateWrapper } from '../common/RequestStateWrapper';
import { useGetMetrics, useMetricNames } from '../../hooks';
import { showPaginationInfo } from '../../utilities/helpers';

import './Metrics.css';

const Metrics: React.FC = () => {
  const [page, setPage ] = useState<number>(1);
  const { selectedMetric } = useMetricNames();
  const { data: { metrics = [], pagination } = {}, isLoading, isError } = useGetMetrics({
    page,
    name: selectedMetric,
  });

  const heading = `Metrics${selectedMetric ?  ` - [ ${selectedMetric} ]` : ''}`;

  useEffect(() => {
    setPage(1);
  }, [selectedMetric]);

  return (
    <section className="section metrics-section">
      <h2 data-testid="metric-heading">{heading}</h2>
      <RequestStateWrapper isLoading={isLoading} isError={isError}>
        {metrics.length ? (
          <div>
            {pagination && <p data-testid="pagination">{showPaginationInfo(pagination)}</p>}
            {metrics.map((metric) => (
              <div className="metric" key={metric._id}>
                <div data-testid="metric-date" className="date metric-data">{new Date(metric.createdAt).toLocaleString()}</div>
                <div data-testid="metric-name" className="name metric-data">{metric.name}</div>
                <div data-testid="metric-value" className="value metric-data">{metric.value}</div>
              </div>
            ))}
            <div className='pagination-buttons-wrapper input-wrapper'>
              <button
                data-testid="previous-button"
                disabled={page === 1} 
                onClick={() => setPage((prevPage) => prevPage - 1)} 
                type="button" 
                className='submit-button'
              >
                Previous
              </button>
              <button
                data-testid="next-button"
                disabled={pagination?.pageCount === page}
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