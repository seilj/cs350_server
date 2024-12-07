import { ApiProperty } from '@nestjs/swagger';

export class UpdateRestaurantDto {
  @ApiProperty({ description: 'Restaurant name', example: 'New Name' })
  name?: string;

  @ApiProperty({
    description: 'Availability of the restaurant',
    example: false,
  })
  available?: boolean;
}
