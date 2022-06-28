import React, { useState, useCallback } from 'react';
import { MetricNameAutoSuggest } from '../autosuggest/MetricNameAutoSuggest';
import { useMetricNames, useCreateMetric } from '../../hooks';

import './AddMetric.css';

const AddMetric = () => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const { metricNames = [], setSelectedMetric } = useMetricNames();
  const { mutateAsync } = useCreateMetric();

  const handleCreateMetric = useCallback(async () => {
    mutateAsync({
      name,
      value: Number(value),
    });
    setSelectedMetric(name);
    setName('');
    setValue('');
  }, [mutateAsync, name, value, setName, setValue, setSelectedMetric]);

  return (
    <section className="add-metric-section section">
      <h2>Add metric</h2>
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
            value={value} 
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
            placeholder="enter metric value"
          />
        </div>
        <div className="input-wrapper">
          <button type="button" onClick={handleCreateMetric} className='submit-button'>Add Metric</button>
        </div>        
      </div>
    </section>
  )
}

export { AddMetric };
