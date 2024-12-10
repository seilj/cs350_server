import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SensorDataDocument = HydratedDocument<SensorData>;

@Schema()
export class SensorData {
  @Prop({
    type: String,
    required: true,
  })
  sensorId: string;

  @Prop({
    type: String,
    required: true,
  })
  restaurantId: string;

  @Prop({ type: Number, default: Date.now() })
  createdAt: number;

  @Prop({ type: Number, required: true })
  data: number;
}

export const SensorDataSchema = SchemaFactory.createForClass(SensorData);
SensorDataSchema.index({ sensorId: 1, createdAt: -1 }, { unique: true });
