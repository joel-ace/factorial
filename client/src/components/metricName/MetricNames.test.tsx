import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { MetricNames } from './MetricNames';
import { renderComponent } from '../../utilities/testUtilities';
import { useMetricNames } from '../../hooks/useMetricNames';
import { metricNames } from '../../mocks/metrics';

jest.mock('../../hooks/useMetricNames');
const setSelectedMetric = jest.fn();

const metricNamesHookImplementation = (selectedMetric: string) => ({
  metricNames,
  selectedMetric,
  isLoading: false,
  isError: false,
  setSelectedMetric: setSelectedMetric,
});

describe('MetricNames', () => {
  beforeEach(() => {
    (useMetricNames as jest.Mock).mockImplementation(() => metricNamesHookImplementation('age'));
  });

  afterAll(() => {
    jest.unmock('../../hooks/useMetricNames');
  });

  it('renders a select input', () => {
    (useMetricNames as jest.Mock).mockImplementation(() => metricNamesHookImplementation(''));
  
    renderComponent(<MetricNames />);

    const selectInput = screen.getByTestId('metric-names-select');

    expect(selectInput).toBeInTheDocument();
  });

  it('should allow users select metric', () => {
    const selectedMetric = metricNames[0].name;

    renderComponent(<MetricNames />);

    fireEvent.change(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: selectedMetric }),
    )

    expect((screen.getByRole('option', { name: selectedMetric }) as HTMLOptionElement).selected).toBe(true);
    expect(setSelectedMetric).toHaveBeenCalledWith(selectedMetric);
  });
});
