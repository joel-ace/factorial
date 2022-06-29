import mongoose from 'mongoose';

export const createMetricResponse = [
  { _id: new mongoose.Types.ObjectId(), name: 'age', value: 15 },
  { _id: new mongoose.Types.ObjectId(), name: 'height', value: 20 },
];

export const averageResponse = [
  {
    lastMin: [{
      average: 34
    }],
    lastHour: [{
      average: 12
    }],
    lastDay: [{
      average: 19
    }],
  },
];

export const req = {
  body: {},
  params: {},
  query: {}
};

export const res = {
  status: (status) => ({
    send: (data) => ({ status, ...data }),
  }),
};

