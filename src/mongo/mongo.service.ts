import { Injectable } from '@nestjs/common';
import { MongoRepository } from './mongo.repository';
import { Congestion, SensorType } from 'src/common/types';
import { RestaurantStatusDTO } from 'src/user/dto/restaurant-status.dto';
import { SensorData } from './schemas/sensor.data.schema';
import { Restaurant } from './schemas/restaurant.schema';
import { RestaurantDTO } from 'src/user/dto/restaurant.dto';

interface CacheData {
  congestion: Congestion;
  lineLength: number;
  waitingTime: number;
  emptyCount: number;
  timestamp: number; // 캐시 갱신 시간
}

//db로부터 받아온 데이터를 가공하는 로직
@Injectable()
export class MongoService {

  private cache: Record<string, CacheData> = {}; // 레스토랑 ID를 키로 하는 캐시 객체
  private readonly CACHE_TTL = 10 * 1000; // 캐시 TTL (예: 10초)

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

    // 캐시 확인
    const cache = this.cache[restaurantId];
    if (cache && Date.now() - cache.timestamp < this.CACHE_TTL) {
      // 캐시가 유효하면 바로 반환
      return {
        congestion: cache.congestion,
        lineLength: cache.lineLength,
        waitingTime: cache.waitingTime,
        emptyCount: cache.emptyCount,
      };
    }

    const seats = restaurant.seats;

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
    const waitingTime = 5 + 2*lineData + doorData;
    let congestion: Congestion;

    if(emptyCount/seats > 0.5){
      congestion = Congestion.Low;
    } else if(emptyCount/seats > 0.2){
      congestion = Congestion.Normal;
    } else{
      congestion = Congestion.High;
    }

    // 캐시 갱신
    this.cache[restaurantId] = {
      congestion,
      lineLength: lineData,
      waitingTime,
      emptyCount,
      timestamp: Date.now(), // 캐시 갱신 시점 기록
    };


    return {
      congestion: congestion, // enum으로 관리 필요
      lineLength: lineData,
      waitingTime: waitingTime, // second
      emptyCount: emptyCount,
    };
  }
}
