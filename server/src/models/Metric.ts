import mongoose, { Schema, Document } from 'mongoose';

export interface IMetric {
  name: string;
  value: number;
};

export interface IMetricModel extends IMetric, Document {};

const MetricSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    value: { type: Number, required: true },
    _id: { type: Schema.Types.ObjectId, required: true},
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model<IMetricModel>('Metric', MetricSchema);

