import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'src/mongo/mongo.repository';
import {
  CreateRestaurantBatchDto,
  CreateRestaurantDto,
} from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';

@Injectable()
export class AdminService {
  constructor(private readonly db: MongoRepository) {}

  // ** Restaurant Methods **

  // Get the list of all restaurants
  async getRestaurantList() {
    return await this.db.getAllRestaurants();
  }

  // Create a new restaurant
  async createRestaurant(createRestaurantDto: CreateRestaurantDto) {
    return await this.db.createRestaurant(createRestaurantDto);
  }

  // Update a restaurant by its ID
  async updateRestaurant(
    restaurantId: string,
    updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return await this.db.updateRestaurant(restaurantId, updateRestaurantDto);
  }

  // Delete a restaurant by its ID
  async deleteRestaurant(restaurantId: string) {
    return await this.db.deleteRestaurant(restaurantId);
  }

  // ** Sensor Methods **

  // Get the list of sensors for a specific restaurant
  async getSensorList(restaurantId?: string) {
    if (restaurantId)
      return await this.db.getSensorsByRestaurantId(restaurantId);
    return await this.db.getSensors();
  }

  // Create a new sensor
  async createSensor(createSensorDto: CreateSensorDto) {
    return await this.db.createSensor(createSensorDto);
  }

  // Update a sensor by its ID
  async updateSensor(sensorId: string, updateSensorDto: UpdateSensorDto) {
    return await this.db.updateSensor(sensorId, updateSensorDto);
  }

  // Delete a sensor by its ID
  async deleteSensor(sensorId: string) {
    return await this.db.deleteSensor(sensorId);
  }

  async createRestaurantBatch(dto: CreateRestaurantBatchDto) {
    const results = [];
    for (const restaurant of dto.restaurants) {
      const result = await this.db.createRestaurant(restaurant);
      results.push(result);
    }
    return results;
  }
}
