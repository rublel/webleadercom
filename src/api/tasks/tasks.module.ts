import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/mysql/database.module';
import { subscriptionProviders } from 'src/models/subscription/subscription.providers';
import { LoggerModule } from 'src/utils/looger/logger/logger.module';
import { customerProviders } from 'src/models/customer/customer.providers';
import { taskProviders } from 'src/models/task/task.provider';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [DatabaseModule, LoggerModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    ...taskProviders,
    ...customerProviders,
    ...subscriptionProviders,
  ],
})
export class TasksModule {}
