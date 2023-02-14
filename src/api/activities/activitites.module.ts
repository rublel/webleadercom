import { Module } from '@nestjs/common';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';
import { activityProviders } from '../../models/activity/activity.providers';
import { DatabaseModule } from 'src/common/mysql/database.module';
import { LoggerModule } from 'src/utils/looger/logger/logger.module';

@Module({
  imports: [DatabaseModule, LoggerModule],
  controllers: [ActivitiesController],
  providers: [ActivitiesService, ...activityProviders],
})
export class ActivitiesModule {}
