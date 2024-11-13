import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RestaurantDataDocument = HydratedDocument<RestaurantData>;

@Schema()
export class RestaurantData {
  @Prop({
    type: String,
    required: true,
  })
  restaurantId: string;

  @Prop({ type: Number, default: Date.now() })
  createdAt: number;

  @Prop({ type: String })
  congestion: string;

  @Prop({ type: Number })
  waitingTime: number;
}

export const RestaurantDataSchema =
  SchemaFactory.createForClass(RestaurantData);

RestaurantDataSchema.index(
  { restaurantId: 1, createdAt: -1 },
  { unique: true },
);
