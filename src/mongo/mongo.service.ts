import { Injectable } from '@nestjs/common';
import { MongoRepository } from './mongo.repository';
import { Congestion, SensorType } from 'src/common/types';
import { RestaurantStatusDTO } from 'src/user/dto/restaurant-status.dto';
import { SensorData } from './schemas/sensor.data.schema';
import { Restaurant } from './schemas/restaurant.schema';
import { RestaurantDTO } from 'src/user/dto/restaurant.dto';

//db로부터 받아온 데이터를 가공하는 로직
@Injectable()
export class MongoService {
  constructor(private repo: MongoRepository) {}

  async getRestaurantList(): Promise<RestaurantDTO[]> {
    return this.repo.getAllRestaurants().then((items: Restaurant[]) =>
      items.map(({ restaurantId, name }) => ({
        restaurantId,
        restaurantName: name,
      })),
    );
  }

  async saveSensorData(data: Partial<SensorData>) {
    // if (!(await this.repo.getSensor(sensorId))) {
    //   throw new Error('No sensor');
    // }
    await this.repo.addSensorData(data);
  }

  async getRestaurantStatusData(
    restaurantId: string,
  ): Promise<RestaurantStatusDTO> {
    const isCache = false;
    if (isCache) {
      return {
        congestion: Congestion.High, // enum으로 관리 필요
        waitingTime: 60, // second
        emptyCount: 3,
      };
    }
    const sensors = await this.repo.getRestaurantSensors(restaurantId);
    const sensorDataList = await Promise.all(
      sensors.map((sensor) =>
        this.repo
          .getRecentSensorData(sensor.sensorId)
          .then((data) => ({ ...data, sensorType: sensor.sensorType })),
      ),
    );
    const dataList = sensorDataList.reduce(
      (prev, { sensorType, ...data }) => {
        prev[sensorType].push(data);
        return prev;
      },
      {
        [SensorType.Door]: [],
        [SensorType.Line]: [],
        [SensorType.Seat]: [],
      },
    );

    console.log(dataList);
    // TODO: dataList 가공해서 아래 데이터
    // save cache
    return {
      congestion: Congestion.High, // enum으로 관리 필요
      waitingTime: 60, // second
      emptyCount: 3,
    };
  }
}
