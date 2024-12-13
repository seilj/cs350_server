import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { RestaurantStatusDTO } from './dto/restaurant-status.dto';
import { RestaurantDTO } from './dto/restaurant.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Front')
@Controller('/user')
export class UserController {
  constructor(private service: UserService) {}

  @Get('/restaurants')
  @ApiOperation({ summary: 'Get all available restaurant list' })
  async getRestaurants(): Promise<RestaurantDTO[]> {
    return this.service.getRestaurantList();
  }

  @Get('/restaurant-status')
  @ApiOperation({ summary: 'Get restaurant status' })
  @ApiQuery({
    name: 'restaurant_id',
    description: 'Restaurant ID',
    example: 'N11',
  })
  async getRestaurantStatus(
    @Query('restaurant_id') restaurantId: string,
  ): Promise<RestaurantStatusDTO> {
    return this.service.getRestaurantStatus({ restaurantId });
  }
}
