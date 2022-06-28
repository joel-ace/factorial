import { useQuery } from 'react-query';
import { getAverages } from '../api';

import type { UseQueryResult } from 'react-query';
import type { IAverageResponse } from '../api';

const REFETCH_INTERVAL = 60000; // one minute

interface IUseGetAverages {
  name: string;
  enabled: boolean;
};

const useGetAverages = ({ name, enabled }: IUseGetAverages): UseQueryResult<IAverageResponse> => useQuery(
  ['metric-average', name],
  () => getAverages(name),
  { 
    enabled,
    refetchInterval: REFETCH_INTERVAL
  }
);

export { useGetAverages };