import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantDto {
  @ApiProperty({ description: 'Restaurant ID', example: 'res-123' })
  restaurantId: string;

  @ApiProperty({ description: 'Restaurant name', example: 'KAIST Cafeteria' })
  name: string;

  @ApiProperty({ description: 'Restaurant seats number', example: 4 })
  seats: number;

  @ApiProperty({ description: 'Availability of the restaurant', example: true })
  available?: boolean;
}

export class CreateRestaurantBatchDto {
  @ApiProperty({
    type: [CreateRestaurantDto],
    description: 'Array of restaurants to be created',
  })
  restaurants: CreateRestaurantDto[];
}
