import { Module } from '@nestjs/common';
import { SensorModule } from './sensor/sensor.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

const DbHost = 'localhost';
@Module({
  imports: [
    SensorModule,
    UserModule,
    MongooseModule.forRoot(`mongodb://${DbHost}/scp`, {
      connectionName: 'scp',
    }),
  ],
})
export class AppModule {}
