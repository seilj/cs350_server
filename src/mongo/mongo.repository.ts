import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from 'src/mongo/schemas/restaurant.schema';
import { Sensor } from './schemas/sensor.schema';
import { SensorData } from './schemas/sensor.data.schema';
import { RestaurantData } from './schemas/restaurant.data.schema';
import { Model } from 'mongoose';

// db로부터 데이터받아오는 로직
@Injectable()
export class MongoRepository {
  constructor(
    @InjectModel(Sensor.name) private readonly sensorModel: Model<Sensor>,
    @InjectModel(SensorData.name)
    private readonly sensorDataModel: Model<SensorData>,
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<Restaurant>,
    @InjectModel(RestaurantData.name)
    private readonly restaurantDataModel: Model<RestaurantData>,
  ) {}
  // ** Sensor Methods **

  // Create a new sensor
  async createSensor(sensor: Partial<Sensor>): Promise<Sensor> {
    const newSensor = new this.sensorModel(sensor);
    return await newSensor.save();
  }

  async getSensors(): Promise<Sensor[]> {
    return await this.sensorModel.find().exec();
  }

  // Get a list of sensors by restaurantId
  async getSensorsByRestaurantId(restaurantId: string): Promise<Sensor[]> {
    return await this.sensorModel.find({ restaurantId }).exec();
  }

  // Update sensor details
  async updateSensor(
    sensorId: string,
    updateData: Partial<Sensor>,
  ): Promise<Sensor | null> {
    return await this.sensorModel
      .findOneAndUpdate({ sensorId }, updateData, {
        new: true,
      })
      .exec();
  }

  // Delete a sensor
  async deleteSensor(sensorId: string): Promise<Sensor | null> {
    return await this.sensorModel.findOneAndDelete({ sensorId }).exec();
  }

  // ** SensorData Methods **

  // Add new sensor data
  async addSensorData(sensorData: Partial<SensorData>): Promise<SensorData> {
    const newSensorData = new this.sensorDataModel(sensorData);
    return await newSensorData.save();
  }

  // Get recent sensor data by sensorId
  async getRecentSensorData(sensorId: string): Promise<SensorData | null> {
    return await this.sensorDataModel
      .findOne({ sensorId })
      .sort({ createdAt: -1 })
      .exec();
  }

  // ** Restaurant Methods **

  // Create a new restaurant
  async createRestaurant(restaurant: Partial<Restaurant>): Promise<Restaurant> {
    const newRestaurant = new this.restaurantModel(restaurant);
    return await newRestaurant.save();
  }

  //Get restaurant by Id
  async getRestaurant(restaurantId: string): Promise<Restaurant> {
    return await this.restaurantModel.findOne({ restaurantId }).exec();
  }

  // Get all restaurants
  async getAllRestaurants(): Promise<Restaurant[]> {
    return await this.restaurantModel.find().exec();
  }

  // Update restaurant details
  async updateRestaurant(
    restaurantId: string,
    updateData: Partial<Restaurant>,
  ): Promise<Restaurant | null> {
    return await this.restaurantModel
      .findOneAndUpdate({ restaurantId }, updateData, { new: true })
      .exec();
  }

  // Delete a restaurant
  async deleteRestaurant(restaurantId: string): Promise<Restaurant | null> {
    return await this.restaurantModel.findOneAndDelete({ restaurantId }).exec();
  }

  // ** RestaurantData Methods **

  // Add new restaurant data
  async addRestaurantData(
    data: Partial<RestaurantData>,
  ): Promise<RestaurantData> {
    const newRestaurantData = new this.restaurantDataModel(data);
    return await newRestaurantData.save();
  }

  // Get restaurant data by restaurantId
  async getRestaurantData(restaurantId: string): Promise<RestaurantData[]> {
    return await this.restaurantDataModel.find({ restaurantId }).exec();
  }

  async getSensor(sensorId: string): Promise<Sensor | null> {
    return this.sensorModel.findOne({ sensorId }).exec();
  }

  async getRestaurantSensors(restaurantId: string): Promise<Sensor[]> {
    return this.sensorModel.find({ restaurantId, available: true }).exec();
  }
}
