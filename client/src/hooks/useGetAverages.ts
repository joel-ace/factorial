import { useQuery, UseQueryResult } from 'react-query';
import { getAverages } from '../api';

import type { IAverageResponse, IUseGetAverages } from '../types';

const REFETCH_INTERVAL = 60000; // one minute

const useGetAverages = ({ name, enabled }: IUseGetAverages): UseQueryResult<IAverageResponse> => useQuery(
  ['metric-average', name],
  () => getAverages(name),
  { 
    enabled,
    refetchInterval: REFETCH_INTERVAL
  }
);

export { useGetAverages };
