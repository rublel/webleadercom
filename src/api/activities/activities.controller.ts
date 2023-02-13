import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateActivityDto } from 'src/models/activity/activity.dto';
import { Activity } from 'src/models/activity/activity.entity';
import { ActivitiesService } from './activities.service';

@ApiTags('Activities')
@Controller()
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all activities.',
    type: [Activity],
  })
  async findAll(): Promise<Activity[]> {
    return await this.activitiesService.findAll();
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create a new activity.',
    type: Activity,
  })
  async create(@Body() activity: CreateActivityDto): Promise<Activity> {
    return this.activitiesService.create(activity);
  }
}
