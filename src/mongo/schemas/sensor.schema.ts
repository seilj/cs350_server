import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SensorType } from 'src/common/types';

export type SensorDocument = HydratedDocument<Sensor>;

@Schema()
export class Sensor {
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

  @Prop({
    type: String,
    required: true,
    enum: [SensorType.Door, SensorType.Line, SensorType.Seat],
  })
  sensorType: string;

  @Prop({ required: false })
  available?: boolean;
}

export const SensorSchema = SchemaFactory.createForClass(Sensor);
SensorSchema.index({ restaurantId: 1, sensorId: 1 }, { unique: true });
