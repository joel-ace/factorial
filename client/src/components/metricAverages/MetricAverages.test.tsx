import React from 'react';
import { screen } from '@testing-library/react';
import { MetricAverages } from './MetricAverages';
import { renderComponent } from '../../utilities/testUtilities';
import { useMetricNames } from '../../hooks/useMetricNames';
import { useGetAverages } from '../../hooks/useGetAverages';
import { average } from '../../mocks/metrics';

jest.mock('../../hooks/useMetricNames');
jest.mock('../../hooks/useGetAverages');

const MetricNamesHookImplementation = (selectedMetric: string) => ({ selectedMetric });
const GetAveragesHookImplementation = () => ({
  data: average,
  isLoading: false,
  isError: false,
});

describe('MetricAverage', () => {
  beforeEach(() => {
    (useMetricNames as jest.Mock).mockImplementation(() => MetricNamesHookImplementation('age'));
    (useGetAverages as jest.Mock).mockImplementation(() => GetAveragesHookImplementation());
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
  
  it('renders a message when no metric is selected', () => {
    (useMetricNames as jest.Mock).mockImplementation(() => MetricNamesHookImplementation(''));

    renderComponent(<MetricAverages />);

    const message = screen.getByTestId('select-metric-message');
  
    expect(message).toBeInTheDocument();
  });

  it('renders the averages', async () => {
    renderComponent(<MetricAverages />);

    const lastHour = await screen.findByText(average.lastHour.toFixed(2));
    const lastMin = await screen.findByText(average.lastMin.toFixed(2));
    const lastDay = await screen.findByText(average.lastDay.toFixed(2));

    expect(lastHour).toBeInTheDocument();
    expect(lastMin).toBeInTheDocument();
    expect(lastDay).toBeInTheDocument();
  });
});
