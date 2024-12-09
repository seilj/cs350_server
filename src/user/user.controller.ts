import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { RestaurantStatusDTO } from './dto/restaurant-status.dto';
import { RestaurantDTO } from './dto/restaurant.dto';

@Controller('/user')
export class UserController {
  constructor(private service: UserService) {}

  @Get('/restaurants')
  async getRestaurants(): Promise<RestaurantDTO[]> {
    return this.service.getRestaurantList();
  }

  @Get('/status')
  getRestaurantStatus(
    @Query('restaurant_id') restaurantId: string,
  ): RestaurantStatusDTO {
    return this.service.getRestaurantStatus({ restaurantId });
  }
}
