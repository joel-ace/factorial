import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { MetricNameAutoSuggest } from './MetricNameAutoSuggest';
import { renderComponent } from '../../utilities/testUtilities';
import { metricNames } from '../../mocks/metrics';

const onChange = jest.fn();

const props = {
  onChange,
  optionList: metricNames,
  label: 'Label',
  selectedItem: ''
};

const typeInput = () => {
  const nameInput = screen.getByTestId('metric-name-input');

  if (nameInput) {
    fireEvent.change(nameInput, { target: { value: 'age' }})
  }
}

describe('MetricNameAutoSuggest', () => {
  it('renders an input element', () => {
    renderComponent(<MetricNameAutoSuggest { ...props } />);
    
    const nameInput = screen.getByTestId('metric-name-input');

    expect(nameInput).toBeInTheDocument();
  });

  it('calls onChange when user types input', () => {
    renderComponent(<MetricNameAutoSuggest { ...props } />);
    
    typeInput();

    expect(onChange).toBeCalledWith('age');
  });

  it('opens a drop down with suggestions', () => {
    renderComponent(<MetricNameAutoSuggest { ...props } />);
    
    typeInput();

    const nameSuggestion = screen.getByRole('option', { name: 'age' });

    expect(nameSuggestion).toBeInTheDocument();
  });
});
