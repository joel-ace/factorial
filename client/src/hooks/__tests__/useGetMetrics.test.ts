import { renderHook,  waitFor } from '@testing-library/react';
import { useGetMetrics } from '../useGetMetrics';
import { createWrapper } from '../../utilities/testUtilities';
import { metrics } from '../../mocks/metrics';

describe('useGetMetrics hook', () => {
  it('should successfully get metrics', async () => {
    const { result } = renderHook(() => useGetMetrics({}), {
        wrapper: createWrapper(),
    });

    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(metrics);
  })
});
