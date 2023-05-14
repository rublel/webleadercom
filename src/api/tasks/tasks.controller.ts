import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggingInterceptor } from 'src/common/interceptors/logger.interceptor';
import { Task } from 'src/models/task/task.dwc.entity';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from 'src/models/task/task.dto';

@ApiTags('Tasks')
@UseInterceptors(LoggingInterceptor)
@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  //   @Post()
  //   @ApiResponse({
  //     status: 201,
  //     description: 'The record has been successfully created.',
  //     type: MergedSubscriptions,
  //   })
  //   async createSubscription(@Body() createSubscriptionDto: SubscriptionDto) {
  //     return this.subscriptionsService.createSubscription(createSubscriptionDto);
  //   }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Task,
  })
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [Task],
  })
  async getTasks(@Query('month') month: string, @Query('year') year: string) {
    return this.tasksService.findByPeriod(month, year);
  }

  @Patch()
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [Task],
  })
  async updateStatus(
    @Query('subscription_id') subscription_id: string,
    @Query('month') month: string,
  ) {
    return this.tasksService.updateStatus(subscription_id, month);
  }

  @Post('applyTask')
  async applyTask(@Body() body: any) {
    return this.tasksService.applyTask(body);
  }
}
