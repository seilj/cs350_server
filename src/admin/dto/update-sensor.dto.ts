import { ApiProperty } from '@nestjs/swagger';
import { SensorType } from 'src/common/types';

export class UpdateSensorDto {
  @ApiProperty({
    description: 'Sensor type',
    enum: SensorType,
    example: SensorType.Door,
  })
  sensorType?: SensorType;

  @ApiProperty({ description: 'Availability of the sensor', example: false })
  available?: boolean;
}
