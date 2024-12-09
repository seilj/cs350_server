import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { RestaurantListDTO } from './dto/restaurant-list.dto';
import { RestaurantStatusDTO } from './dto/restaurant-status.dto';

@Controller('/user')
export class UserController {
  constructor(private service: UserService) {}

  @Get('/restaurants')
  async getRestaurants(): Promise<RestaurantListDTO> {
    return this.service.getRestaurantList();
  }

  @Get('/status')
  getRestaurantStatus(
    @Query('restaurant_id') restaurantId: string,
  ): RestaurantStatusDTO {
    return this.service.getRestaurantStatus({ restaurantId });
  }
}
