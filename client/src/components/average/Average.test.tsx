import React from 'react';
import { screen } from '@testing-library/react';
import { Average } from './Average';
import { renderComponent } from '../../utilities/testUtilities';
import { average } from '../../mocks/metrics';

describe('Average', () => {
  it('renders the average value', async () => {
    const nameProp = 'Last Min';

    renderComponent(<Average name={nameProp} average={average.lastDay} />);
    
    const label = await screen.findByText(nameProp);
    const averageValue = await screen.findByText(average.lastDay);

    expect(label).toBeInTheDocument();
    expect(averageValue).toBeInTheDocument();
  });
});
