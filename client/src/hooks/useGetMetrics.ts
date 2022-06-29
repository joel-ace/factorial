import { useQuery, UseQueryResult } from 'react-query';
import { getMetrics } from '../api';

import type { IMetricResponse, IGetMetricQueryParams } from '../types';

const useGetMetrics = (params: IGetMetricQueryParams): UseQueryResult<IMetricResponse> => useQuery(
  [
    'metrics',
    params?.name,
    params?.page,
    params?.limit,
  ],
  () => getMetrics(params),
);

export { useGetMetrics };
