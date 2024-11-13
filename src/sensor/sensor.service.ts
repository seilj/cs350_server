import { Injectable } from '@nestjs/common';

@Injectable()
export class SensorService {
  getServerTime(): number {
    return Date.now();
  }

  saveData(): boolean {
    return true;
  }
}
