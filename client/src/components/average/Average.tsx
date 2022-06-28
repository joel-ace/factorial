import React from 'react';
import './Average.css';

interface IAverage {
  name: string;
  average?: number;
};

const Average = React.memo(({
  name,
  average
}: IAverage) => (
  <div className="average">
    <p className="time-frame">{name}</p>
    <p className="average-value">{average?.toFixed(2) || 0}</p>
  </div>
));

export { Average };