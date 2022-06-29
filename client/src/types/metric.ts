export interface IBaseMetric {
  name: string;
  value: number;
};

export interface IMetric extends IBaseMetric {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export interface IGetMetricQueryParams {
  name?: string;
  page?: number;
  limit?: number;
};

export interface IUseGetAverages {
  name: string;
  enabled: boolean;
};
