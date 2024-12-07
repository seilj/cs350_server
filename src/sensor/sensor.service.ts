import { Injectable } from '@nestjs/common';
import { MongoService } from 'src/mongo/mongo.service';

@Injectable()
export class SensorService {
  constructor(private db: MongoService) {}
  getServerTime(): number {
    return Date.now();
  }

  async saveData(data) {
    return this.db.saveSensorData(data);
  }
}
