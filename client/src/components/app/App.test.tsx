import React from 'react';
import { screen } from '@testing-library/react';
import App from './App';
import { renderComponent } from '../../utilities/testUtilities';

describe('App', () => {
  it('renders', () => {
    renderComponent(<App />);
    
    const appContainer = screen.getByTestId('app');

    expect(appContainer).toBeInTheDocument();
  });
});
