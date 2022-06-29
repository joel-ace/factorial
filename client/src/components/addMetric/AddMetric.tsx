import React, { useState, useCallback } from 'react';
import { MetricNameAutoSuggest } from '../autosuggest/MetricNameAutoSuggest';
import { useMetricNames, useCreateMetric } from '../../hooks';
import { inputValidationMessage } from '../../utilities/helpers';

import './AddMetric.css';

const AddMetric = () => {
  const [name, setName] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const { metricNames = [], setSelectedMetric } = useMetricNames();
  const { mutateAsync } = useCreateMetric();

  const handleCreateMetric = useCallback(async () => {
    setErrorMessages([]);

    if (!name || !value || isNaN(Number(value))) {
      const validationErrorMessage = inputValidationMessage(name, value);
      setErrorMessages(validationErrorMessage);
      return;
    }

    const response = await mutateAsync({
      name,
      value: Number(value),
    });

    setName('');
    setValue('');
    setSelectedMetric(response.name);
  }, [mutateAsync, name, value, setName, setValue, setSelectedMetric]);

  return (
    <section className="add-metric-section section">
      <h2>Add metric</h2>
      {errorMessages.length ? (
        <div className="error-messages">
          {errorMessages.map((errorMessage, index) => <p data-testid="validation-error-message" key={`error-message-${index}`}>{errorMessage}</p>)}
        </div>
      ) : null}
      <div className="add-metric-inputs">
        <div className="input-wrapper">
          <MetricNameAutoSuggest
            optionList={metricNames}
            onChange={setName}
            label="Enter metric name e.g Age"
            selectedItem={name}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="metricValueInput">Enter metric Value</label>
          <input 
            name="metric-value-input"
            id="metricValueInput"
            data-testid="metric-value-input"
            value={value} 
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
            placeholder="enter metric value"
          />
        </div>
        <div className="input-wrapper">
          <button
            data-testid="submit-button"
            type="button"
            onClick={handleCreateMetric}
            className='submit-button'
          >
            Add Metric
          </button>
        </div>        
      </div>
    </section>
  )
}

export { AddMetric };
