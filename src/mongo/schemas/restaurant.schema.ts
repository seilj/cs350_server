import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema()
export class Restaurant {
  @Prop({ required: true })
  restaurantId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: 4 })
  seats: number;

  @Prop({ default: true })
  available: boolean;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
