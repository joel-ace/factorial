import * as React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MetricNamesProvider } from '../context/MetricNamesProvider';

// testing utils snippets from: https://github.com/TkDodo/testing-react-query/blob/main/src/tests/utils.tsx

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const renderWithProviders = (child: React.ReactElement | React.ReactNode) => {
  const testQueryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={testQueryClient}>
      <MetricNamesProvider>{child}</MetricNamesProvider>
    </QueryClientProvider>
  );
};

export const renderWithClient = (ui: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(renderWithProviders(ui));

  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>
      ),
  }
};

export const createWrapper = () => {
  return ({ children }: {children: React.ReactNode}) => renderWithProviders(children);
};

export const renderComponent = (Component: React.ReactElement, options?: RenderOptions) => render(renderWithProviders(Component), options);
