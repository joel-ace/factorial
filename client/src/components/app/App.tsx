import React from 'react';
import { MetricNamesProvider } from '../../context/MetricNamesProvider';
import { MetricAverages } from '../metricAverages/MetricAverages';
import { MetricNames } from '../metricName/MetricNames';
import { Metrics } from '../metrics/Metrics';
import { AddMetric } from '../addMetric/AddMetric';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <div className="content">
        <MetricNamesProvider>
          <section className="section top-section">
              <MetricNames />
              <MetricAverages />
          </section>
          <AddMetric />
          <Metrics />
        </MetricNamesProvider>
      </div>
    </div>
  );
}

export default App;
