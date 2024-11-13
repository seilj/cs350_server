import { Controller, Get, Post } from '@nestjs/common';
import { SensorService } from './sensor.service';

@Controller()
export class SensorController {
  constructor(private service: SensorService) {}

  @Get('/time')
  getServerTime() {
    return this.service.getServerTime();
  }

  @Post('/data')
  async saveSensorData() {
    return this.service.saveData();
  }
}
