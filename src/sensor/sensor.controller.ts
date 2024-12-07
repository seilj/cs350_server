import { Controller, Get, Query } from '@nestjs/common';
import { SensorService } from './sensor.service';

@Controller('/sensor')
export class SensorController {
  constructor(private service: SensorService) {}

  @Get('/time')
  getServerTime() {
    return this.service.getServerTime();
  }

  @Get('/data')
  //TODO: Query로 받아온다고 했으니 get
  async saveSensorData(@Query('id') sensorId) {
    return this.service.saveData({ sensorId });
  }
}
