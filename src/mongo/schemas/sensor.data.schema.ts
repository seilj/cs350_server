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

  // TODO: 프론트랑 논의 필요할듯
  @Prop({ type: String, default: JSON.stringify({}) })
  data: string;
}

export const SensorDataSchema = SchemaFactory.createForClass(SensorData);
SensorDataSchema.index({ sensorId: 1, createdAt: -1 }, { unique: true });
