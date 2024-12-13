import { Injectable } from '@nestjs/common';
import { RestaurantStatusDTO } from './dto/restaurant-status.dto';
import { RestaurantDTO } from './dto/restaurant.dto';
import { MongoService } from 'src/mongo/mongo.service';

@Injectable()
export class UserService {
  constructor(private db: MongoService) {}

  async getRestaurantList(): Promise<RestaurantDTO[]> {
    const restaurantList: RestaurantDTO[] = (await this.db.getRestaurantList(
      false,
    )) || [
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
    return restaurantList;
  }

  async getRestaurantStatus({
    restaurantId,
  }: {
    restaurantId: string;
  }): Promise<RestaurantStatusDTO> {
    return this.db.getRestaurantStatusData(restaurantId);
  }
}
