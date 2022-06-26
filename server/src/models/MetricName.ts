import mongoose, { Schema, Document } from 'mongoose';

export interface IMetricName {
  name: string;
};

export interface IMetricModel extends IMetricName, Document {};

const MetricNameSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    _id: { type: Schema.Types.ObjectId, required: true },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IMetricModel>('MetricName', MetricNameSchema);
