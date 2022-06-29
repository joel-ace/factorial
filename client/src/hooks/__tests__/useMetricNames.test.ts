import { renderHook,  waitFor, act } from '@testing-library/react';
import { useMetricNames } from '../useMetricNames';
import { createWrapper } from '../../utilities/testUtilities';
import { metricNames } from '../../mocks/metrics';

describe('useMetricNames hook', () => {
  it('should successfully get metric name', async () => {
    const { result } = renderHook(() => useMetricNames(), {
        wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.selectedMetric).toEqual('');
    expect(result.current.metricNames).toEqual(metricNames);
  });

  it('should update selectedMetric when setSelectedMetric is called', async () => {
    const metricName = 'age';

    const { result } = renderHook(() => useMetricNames(), {
        wrapper: createWrapper(),
    });

    expect(result.current.selectedMetric).toEqual('');

    await act(() => result.current.setSelectedMetric(metricName));

    expect(result.current.selectedMetric).toEqual(metricName);
  })
});
