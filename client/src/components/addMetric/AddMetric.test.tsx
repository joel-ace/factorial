import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { AddMetric } from './AddMetric';
import { renderComponent } from '../../utilities/testUtilities';
import { useMetricNames } from '../../hooks/useMetricNames';
import { useCreateMetric } from '../../hooks/useCreateMetric';
import { metricNames, metric } from '../../mocks/metrics';
import { inputValidationMessages } from '../../utilities/helpers';

jest.mock('../../hooks/useMetricNames');
jest.mock('../../hooks/useCreateMetric');

const setSelectedMetric = jest.fn();
const mutateAsync = jest.fn();

const MetricNamesHookImplementation = () => ({
  metricNames,
  setSelectedMetric,
});

const CreateMetricsHookImplementation = () => ({
  mutateAsync: mutateAsync.mockReturnValue(metric),
});

describe('AddMetric', () => {
  beforeEach(() => {
    (useMetricNames as jest.Mock).mockImplementation(MetricNamesHookImplementation);
    (useCreateMetric as jest.Mock).mockImplementation(CreateMetricsHookImplementation);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders input elements and submit button to add metric', () => {
    renderComponent(<AddMetric />);
    
    const nameInput = screen.queryByTestId('metric-name-input');
    const valueInput = screen.queryByTestId('metric-value-input');
    const submitButton = screen.queryByTestId('submit-button');
  
    expect(nameInput).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('displays error if input is empty', () => {
    renderComponent(<AddMetric />);
    
    const submitButton = screen.queryByTestId('submit-button');
  
    if (submitButton) {
      fireEvent.click(submitButton);
    }
    
    const errorMessages = screen.queryAllByTestId('validation-error-message');
    errorMessages.map(errorMessage => 
      expect(Object.values(inputValidationMessages).includes(errorMessage.innerHTML)).toBe(true))
  });

  it('allows submitting a metric when the submit button is clicked', async () => {
    renderComponent(<AddMetric />);
    
    const nameInput = screen.queryByTestId('metric-name-input');
    const valueInput = screen.queryByTestId('metric-value-input');
    const submitButton = screen.queryByTestId('submit-button');

    if (nameInput && valueInput) {
      fireEvent.change(nameInput, { target: { value: metric.name }})
      fireEvent.change(valueInput, { target: { value: metric.value }})
    }  

    if (submitButton) {
      await fireEvent.click(submitButton);
    }

    expect(mutateAsync).toHaveBeenCalledWith(metric);
    expect(setSelectedMetric).toHaveBeenCalledWith(metric.name);
  });
});
