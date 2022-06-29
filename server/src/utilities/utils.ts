import { Response } from 'express';

export const handleError = (res: Response, message: string) => res.status(500).send({
  message,
});

export const sanitizeNameInput = (name: string) => name.trim().toLowerCase();

export const generateAverageQuery = (name: string, startTime: Date) => (
  [
    {
      $match: {
        'name': sanitizeNameInput(name),
        'createdAt': {
          '$gte': startTime,
          '$lt':  new Date(Date.now()),            
        }
      }
    },
    {
      $group: {
        _id: null,
        average: { $avg: "$value" }
      }
    }
  ]
);

export const generatePaginationData = (page: number, limit: number, resultCount: number, count: number) => {
  const pageCount = Math.ceil(count / limit);
  const pageSize = limit > resultCount ? resultCount : limit;

  return {
    page,
    pageSize,
    limit,
    pageCount,
    totalCount: count,
  };
};

