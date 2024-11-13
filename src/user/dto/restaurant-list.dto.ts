import { ApiProperty } from '@nestjs/swagger';
import { RestaurantDTO } from './restaurant.dto';

export class RestaurantListDTO {
  @ApiProperty({ type: [RestaurantDTO], isArray: true })
  restaurantList: RestaurantDTO[];
}
