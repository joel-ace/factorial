import { useMutation, useQueryClient, UseMutationResult } from "react-query";

import { createMetric } from "../api";
import type { IBaseMetric, IMetric } from '../types';

const useCreateMetric = (): UseMutationResult<IMetric, unknown, IBaseMetric> => {
  const queryClient = useQueryClient();
  return useMutation('create-metric', async (params: IBaseMetric) => {
    const response = await createMetric(params);
    return response;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

export { useCreateMetric };
