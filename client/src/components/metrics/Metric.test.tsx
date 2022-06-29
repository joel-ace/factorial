import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { Metrics } from './Metrics';
import { renderComponent } from '../../utilities/testUtilities';
import { useMetricNames } from '../../hooks/useMetricNames';
import { useGetMetrics } from '../../hooks/useGetMetrics';
import { showPaginationInfo } from '../../utilities/helpers';
import { metrics } from '../../mocks/metrics';

jest.mock('../../hooks/useMetricNames');
jest.mock('../../hooks/useGetMetrics');

const firstPage = {
  limit: 2,
  page: 1,
  pageSize: 2,
  pageCount: 2,
  totalCount: 3,
};

const secondPage = {
  limit: 2,
  page: 2,
  pageSize: 1,
  pageCount: 2,
  totalCount: 3,
};

const MetricNamesHookImplementation = (selectedMetric: string) => ({ selectedMetric });
const GetMetricsHookImplementation = ({ page, name }: { name?: string, page: number}) => ({
  data: (page === 1) ? {
    metrics: metrics.metrics.slice(0, 2),
    pagination: firstPage
  } : {
    metrics: [metrics.metrics[2]],
    pagination: secondPage,
  },
  isLoading: false,
  isError: false,
});

describe('MetricAverage', () => {
  beforeEach(() => {
    (useMetricNames as jest.Mock).mockImplementation(() => MetricNamesHookImplementation('age'));
    (useGetMetrics as jest.Mock).mockImplementation(GetMetricsHookImplementation);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
  
  it('should not name of metric if no selected metric', () => {
    (useMetricNames as jest.Mock).mockImplementation(() => MetricNamesHookImplementation(''));

    renderComponent(<Metrics />);

    const heading = screen.getByTestId('metric-heading').innerHTML;
  
    expect(heading).toEqual('Metrics');
  });

  it('adds metric name to heading if metric is selected', () => {
    renderComponent(<Metrics />);

    const heading = screen.getByTestId('metric-heading').innerHTML;
  
    expect(heading).toEqual('Metrics - [ age ]');
  });

  it('displays the list of metrics', () => {
    renderComponent(<Metrics />);

    const date = screen.queryAllByTestId('previous-button')[0];
    const name = screen.queryAllByTestId('metric-name')[0];
    const value = screen.queryAllByTestId('metric-value')[0];

    expect(date).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(value).toBeInTheDocument();
  });

  it('displays pagination buttons', () => {
    renderComponent(<Metrics />);

    const previousButton = screen.queryByTestId('previous-button');
    const nextButton = screen.queryByTestId('next-button');

    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('displays a pagination string', () => {
    renderComponent(<Metrics />);

    const expectedPaginationString = showPaginationInfo(firstPage);
    const paginationString = screen.queryByTestId('pagination');

    expect(paginationString?.innerHTML).toEqual(expectedPaginationString);
    expect(paginationString).toBeInTheDocument();
  });


  it('loads next metrics when next button is clicked', () => {
    renderComponent(<Metrics />);

    const nextButton = screen.queryByTestId('next-button');

    if (nextButton) {
      fireEvent.click(nextButton);
    }

    const paginationString = screen.queryByTestId('pagination');
    const expectedPaginationString = showPaginationInfo(secondPage);
    const name = screen.queryAllByTestId('metric-name')[0];
  
    expect(paginationString?.innerHTML).toEqual(expectedPaginationString);
    expect(name.innerHTML).toEqual(metrics.metrics[2].name);
  });
});
