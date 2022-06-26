import { NextFunction, Request, Response } from 'express';


export const handleError = (res: Response, message: string) => res.status(500).send({
  message,
});


export const generateAverageQuery = (name: string, startTime: Date) => (
  [
    {
      '$match': {
        'name': name,
        'createdAt': {
          '$gte': startTime,
          '$lt':  new Date(Date.now()),            
        }
      }
    },
    {
      '$group': {
        _id: null,
        average: { $avg: "$value" }
      }
    }
  ]
);
