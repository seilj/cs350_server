import { Module } from '@nestjs/common';
import { SensorModule } from './sensor/sensor.module';
import { UserModule } from './user/user.module';
import { MongoModule } from './mongo/mongo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';

const DbHost = 'localhost';
@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${DbHost}/scp`),
    MongoModule,
    SensorModule,
    UserModule,
    AdminModule,
  ],
})
export class AppModule {}
