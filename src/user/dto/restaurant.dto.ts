import { ApiProperty } from '@nestjs/swagger';

export class RestaurantDTO {
  @ApiProperty({
    description: '식당 고유 식별자',
    example: 'N11',
  })
  restaurantId: string;

  @ApiProperty({
    description: '식당명',
    example: '카이마루',
  })
  restaurantName: string;
}
