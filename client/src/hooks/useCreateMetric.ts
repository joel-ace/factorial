import { useMutation, useQueryClient } from "react-query";

import { createMetric } from "../api";
import type { ICreateMetricParams } from '../api';

const useCreateMetric = () => {
  const queryClient = useQueryClient();
  const createMetricMutation = useMutation('create-metric', async (params: ICreateMetricParams) => {
    const response = await createMetric(params);
    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  return createMetricMutation;
};

export { useCreateMetric };
