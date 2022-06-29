import { renderHook,  waitFor } from '@testing-library/react';
import { useGetAverages } from '../useGetAverages';
import { createWrapper } from '../../utilities/testUtilities';
import { average, metric } from '../../mocks/metrics';

describe('useGetAverages hook', () => {
  it('should successfully get averages', async () => {
    const { result } = renderHook(() => useGetAverages({
      name: metric.name,
      enabled: true,
    }), {
        wrapper: createWrapper(),
    });

    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(average);
  })
});
