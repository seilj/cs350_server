import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { RestaurantListDTO } from './dto/restaurant-list.dto';
import { RestaurantStatusDTO } from './dto/restaurant-status.dto';

@Controller()
export class UserController {
  constructor(private service: UserService) {}

  @Get('/restaurants')
  getRestaurants(): RestaurantListDTO {
    return this.service.getRestaurantList();
  }

  @Get('/status')
  getRestaurantStatus(
    @Query('restaurant_id') restaurantId: number,
  ): RestaurantStatusDTO {
    return this.service.getRestaurantStatus({ restaurantId });
  }
}
