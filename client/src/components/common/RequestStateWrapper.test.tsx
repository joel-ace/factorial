import React from 'react';
import { screen } from '@testing-library/react';
import { RequestStateWrapper } from './RequestStateWrapper';
import { renderComponent } from '../../utilities/testUtilities';
import type { RequestStateWrapperProps } from './RequestStateWrapper';

const renderRequestStateWrapper = (props: Pick<RequestStateWrapperProps, "isError" | "isLoading">) => {
  renderComponent(
    <RequestStateWrapper {...props}>
      <div>Sample element</div>
    </RequestStateWrapper>
  )
};

describe('RequestStateWrapper', () => {
  it('renders the loading text when isLoading is true', async () => {
    renderRequestStateWrapper({
      isLoading: true,
      isError: false,
    });

    const loading = await screen.findByText('loading...');
    expect(loading).toBeInTheDocument();
  });

  it('renders the error text when isError is true', async () => {
    renderRequestStateWrapper({
      isLoading: false,
      isError: true,
    });

    const errorMessage = await screen.findByText('Unfortunately something went wrong. Please retry again later');
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders child when both isError and isLoading is false', async () => {
    renderRequestStateWrapper({
      isLoading: false,
      isError: false,
    });
  
    const text = await screen.findByText('Sample element');
    expect(text).toBeInTheDocument();
  });
});
