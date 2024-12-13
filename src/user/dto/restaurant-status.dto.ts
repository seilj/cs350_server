import { ApiProperty } from '@nestjs/swagger';
import { Congestion } from 'src/common/types';

export class RestaurantStatusDTO {
  @ApiProperty({
    description: '식당 혼잡도',
    example: Congestion.High,
    enum: Congestion,
  })
  congestion: Congestion;
  @ApiProperty({
    description: '줄길이',
    example: 3,
  })
  lineLength: number;
  @ApiProperty({
    description: '예상 대기시간(단위: second)',
    example: 60,
  })
  waitingTime: number;
  @ApiProperty({
    description: '빈 좌석 수',
    example: 4,
  })
  emptyCount: number;
}
