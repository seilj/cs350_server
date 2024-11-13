import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Restaurant,
  RestaurantSchema,
} from 'src/mongo/schemas/restaurant.schema';
import { Sensor, SensorSchema } from './schemas/sensor.schema';
import { SensorData, SensorDataSchema } from './schemas/sensor.data.schema';
import {
  RestaurantData,
  RestaurantDataSchema,
} from './schemas/restaurant.data.schema';
import { mongoService } from './mongo.service';
import { mongoRepository } from './mongo.repository';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Restaurant.name, schema: RestaurantSchema }],
      'restaurant',
    ),
    MongooseModule.forFeature(
      [{ name: Sensor.name, schema: SensorSchema }],
      'sensor',
    ),
    MongooseModule.forFeature(
      [{ name: SensorData.name, schema: SensorDataSchema }],
      'sensorData',
    ),
    MongooseModule.forFeature(
      [{ name: RestaurantData.name, schema: RestaurantDataSchema }],
      'restaurantData',
    ),
  ],
  exports: [mongoService],
  providers: [mongoService, mongoRepository],
})
export class MongoModule {}
