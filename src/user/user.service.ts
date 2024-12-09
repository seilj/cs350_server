import { Injectable } from '@nestjs/common';
import { RestaurantStatusDTO } from './dto/restaurant-status.dto';
import { Congestion } from 'src/common/types';
import { RestaurantListDTO } from './dto/restaurant-list.dto';
import { RestaurantDTO } from './dto/restaurant.dto';
import { MongoService } from 'src/mongo/mongo.service';

@Injectable()
export class UserService {
  constructor(private db: MongoService) {}

  async getRestaurantList(): Promise<RestaurantListDTO> {
    const restaurantList: RestaurantDTO[] =
      (await this.db.getRestaurantList()) || [
        {
          restaurantId: 'N11',
          restaurantName: '카이마루',
        },
        {
          restaurantId: 'E16',
          restaurantName: '서브웨이',
        },
        {
          restaurantId: 'E5',
          restaurantName: '동맛골',
        },
        {
          restaurantId: 'W2',
          restaurantName: '서맛골',
        },
        {
          restaurantId: 'N6',
          restaurantName: '교수회관',
        },
      ];
    return { restaurantList };
  }

  getRestaurantStatus({
    restaurantId,
  }: {
    restaurantId: string;
  }): RestaurantStatusDTO {
    // TODO
    // return this.db.getRestaurantStatusData(restaurantId);
    console.log(restaurantId);
    return {
      congestion: Congestion.High, // enum으로 관리 필요
      waitingTime: 60, // second
      emptyCount: 3,
    };
  }
}
