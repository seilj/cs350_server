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

  async getRestaurantList(getAll = true): Promise<RestaurantDTO[]> {
    return this.repo.getAllRestaurants().then((items: Restaurant[]) =>
      items
        .filter(({ available }) => getAll || available)
        .map(({ restaurantId, name }) => ({
          restaurantId,
          restaurantName: name,
        })),
    );
  }

  async saveSensorData(data: {sensorId: string; sensorValue: number}) {
    const sensor = await this.repo.getSensor(data.sensorId);
    if(!sensor){
      throw new Error('No Sensor with ID: ${data.sensorId}');
    }

    const sensorData = {
      sensorId: data.sensorId,
      restaurantId: sensor.restaurantId,
      createdAt: Date.now(),
      data: data.sensorValue,
    };

    await this.repo.addSensorData(sensorData);
  }

  async getRestaurantStatusData(
    restaurantId: string,
  ): Promise<RestaurantStatusDTO> {

    const restaurant = await this.repo.getRestaurant(restaurantId);
    if(!restaurant){
      throw new Error('No restaurant with ID: ${restaurantId}');
    }

    const seats = restaurant.seats;

    const isCache = false;
    if (isCache) {
      return {
        congestion: Congestion.High, // enum으로 관리 필요
        waitingTime: 60, // second
        emptyCount: 3,
      };
    }
    const sensors = await this.repo.getRestaurantSensors(restaurantId);
    console.log(sensors)
    const sensorDataList = await Promise.all(
      sensors.map(async (sensor) => {
        const data = await this.repo.getRecentSensorData(sensor.sensorId);
        if (!data) {
          return { sensorType: sensor.sensorType, data: null }; // 데이터가 없을 경우 처리
        }
        // 필요한 데이터만 추출
        return {
          sensorId: data.sensorId,
          data: data.data,
          createdAt: data.createdAt,
          sensorType: sensor.sensorType,
        };
      }),
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

    const emptyCount = dataList[SensorType.Seat].reduce(
      (sum, sensorData) => sum + sensorData.data,
      0,
    );
    const lineData = dataList[SensorType.Door][0]?.data || 0;
    const doorData = dataList[SensorType.Door][0]?.data || 0;
    const waitingTime = 5*lineData + doorData;
    let congestion: Congestion;

    if(emptyCount/seats > 0.5){
      congestion = Congestion.Low;
    } else if(emptyCount/seats > 0.2){
      congestion = Congestion.Normal;
    } else{
      congestion = Congestion.High;
    }


    return {
      congestion: congestion, // enum으로 관리 필요
      waitingTime: waitingTime, // second
      emptyCount: emptyCount,
    };
  }
}
