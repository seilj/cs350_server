import { ApiProperty } from '@nestjs/swagger';
import { SensorType } from 'src/common/types';

export class CreateSensorDto {
  @ApiProperty({ description: 'Sensor ID', example: 'sensor1' })
  sensorId: string;

  @ApiProperty({ description: 'Restaurant ID', example: 'N11' })
  restaurantId: string;

  @ApiProperty({
    description: 'Sensor type',
    enum: SensorType,
    example: SensorType.Line,
  })
  sensorType: SensorType;

  @ApiProperty({ description: 'Availability of the sensor', example: true })
  available?: boolean;
}
