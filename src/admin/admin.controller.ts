import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import {
  CreateRestaurantBatchDto,
  CreateRestaurantDto,
} from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Restaurants
  @Get('restaurants')
  @ApiOperation({ summary: 'Get all restaurants' })
  async getRestaurantList() {
    return this.adminService.getRestaurantList();
  }

  @Post('restaurants')
  @ApiOperation({ summary: 'Create a restaurant' })
  @ApiBody({ type: CreateRestaurantDto })
  async createRestaurant(@Body() dto: CreateRestaurantDto) {
    return this.adminService.createRestaurant(dto);
  }

  @Put('restaurants/:id')
  @ApiOperation({ summary: 'Update a restaurant' })
  @ApiParam({ name: 'id', description: 'Restaurant ID' })
  @ApiBody({ type: UpdateRestaurantDto })
  async updateRestaurant(
    @Param('id') restaurantId: string,
    @Body() dto: UpdateRestaurantDto,
  ) {
    return this.adminService.updateRestaurant(restaurantId, dto);
  }

  @Delete('restaurants/:id')
  @ApiOperation({ summary: 'Delete a restaurant' })
  @ApiParam({ name: 'id', description: 'Restaurant ID' })
  async deleteRestaurant(@Param('id') restaurantId: string) {
    return this.adminService.deleteRestaurant(restaurantId);
  }

  // Sensors
  @Get('sensors')
  @ApiOperation({ summary: 'Get all sensors || Get sensors for a restaurant' })
  @ApiQuery({
    name: 'restaurantId',
    description: 'Restaurant ID',
    required: false,
  })
  async getSensorList(@Query('restaurantId') restaurantId?: string) {
    return this.adminService.getSensorList(restaurantId);
  }

  @Post('sensors')
  @ApiOperation({ summary: 'Create a sensor' })
  @ApiBody({ type: CreateSensorDto })
  async createSensor(@Body() dto: CreateSensorDto) {
    return this.adminService.createSensor(dto);
  }

  @Put('sensors/:id')
  @ApiOperation({ summary: 'Update a sensor' })
  @ApiParam({ name: 'id', description: 'Sensor ID' })
  @ApiBody({ type: UpdateSensorDto })
  async updateSensor(
    @Param('id') sensorId: string,
    @Body() dto: UpdateSensorDto,
  ) {
    return this.adminService.updateSensor(sensorId, dto);
  }

  @Delete('sensors/:id')
  @ApiOperation({ summary: 'Delete a sensor' })
  @ApiParam({ name: 'id', description: 'Sensor ID' })
  async deleteSensor(@Param('id') sensorId: string) {
    return this.adminService.deleteSensor(sensorId);
  }

  @Post('restaurants/batch')
  @ApiOperation({ summary: 'Create multiple restaurants at once' })
  @ApiBody({
    type: CreateRestaurantBatchDto,
    examples: {
      default: {
        summary: 'Example payload',
        description: 'An example of creating multiple restaurants',
        value: {
          restaurants: [
            {
              restaurantId: 'N11',
              name: '카이마루',
            },
            {
              restaurantId: 'E16',
              name: '서브웨이',
            },
            {
              restaurantId: 'E5',
              name: '동맛골',
            },
            {
              restaurantId: 'W2',
              name: '서맛골',
            },
            {
              restaurantId: 'N6',
              name: '교수회관',
            },
          ],
        },
      },
    },
  })
  async createRestaurantBatch(@Body() dto: CreateRestaurantBatchDto) {
    return this.adminService.createRestaurantBatch(dto);
  }
}
