import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongoService } from 'src/mongo/mongo.service';
// import { MongoRepository } from 'src/mongo/mongo.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, MongoService],
})
export class UserModule {}
