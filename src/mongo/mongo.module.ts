import { Global, Module } from '@nestjs/common';
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
import { MongoService } from './mongo.service';
import { MongoRepository } from './mongo.repository';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema },
      { name: Sensor.name, schema: SensorSchema },
      { name: SensorData.name, schema: SensorDataSchema },
      { name: RestaurantData.name, schema: RestaurantDataSchema },
    ]),
  ],
  exports: [MongoService, MongoRepository],
  providers: [MongoService, MongoRepository],
})
export class MongoModule {}
