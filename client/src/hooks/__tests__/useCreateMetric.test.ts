import { renderHook, act, waitFor } from '@testing-library/react';
import { useCreateMetric } from '../useCreateMetric';
import { createWrapper } from '../../utilities/testUtilities';
import { metric } from '../../mocks/metrics';

describe('useCreateMetric hook', () => {
  it('should successfully create a metric', async () => {
    const { result } = renderHook(() => useCreateMetric(), {
        wrapper: createWrapper(),
    });

    expect(result.current.isSuccess).toBe(false);

    //@ts-ignore
    await act(() => result.current.mutateAsync(metric)); 
    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(metric);
  })
});
