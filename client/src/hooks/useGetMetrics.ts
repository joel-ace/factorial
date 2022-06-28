import { useQuery } from 'react-query';
import { getMetrics } from '../api';

import type { UseQueryResult } from 'react-query';
import type { IMetricResponse, IGetMetricQueryParams } from '../api';

const useGetMetrics = (params: IGetMetricQueryParams): UseQueryResult<IMetricResponse[]> => useQuery(
  [
    'metrics',
    params?.name,
    params?.page,
    params?.limit,
  ],
  () => getMetrics(params),
);

export { useGetMetrics };
