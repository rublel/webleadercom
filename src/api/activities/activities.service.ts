import { Inject, Injectable } from '@nestjs/common';
import { Activity } from 'src/models/activity/activity.dwc.entity';
import { Repository } from 'typeorm';
import { CreateActivityDto } from 'src/models/activity/activity.dto';
import { ACTIVITY_REPOSITORY } from 'src/models/constants';

@Injectable()
export class ActivitiesService {
  constructor(
    @Inject(ACTIVITY_REPOSITORY)
    private activityRepository: Repository<Activity>,
  ) {}

  async findAll(): Promise<Activity[]> {
    return this.activityRepository
      .createQueryBuilder('activity')
      .leftJoinAndSelect('activity.user', 'user')
      .getMany();
  }

  async create(activityDto: CreateActivityDto): Promise<Activity> {
    const activity = new Activity(activityDto);
    return this.activityRepository.save(activity);
  }
}
