import { Module } from '@nestjs/common';
import { ImpayesService } from './impayes.service';
import { ImpayesController } from './impayes.controller';
import { DatabaseModule } from 'src/common/mysql/database.module';
import { impayeProviders } from 'src/models/impaye/impayes.providers';
import { LoggerModule } from 'src/utils/looger/logger/logger.module';
import { customerProviders } from 'src/models/customer/customer.providers';
import { subscriptionProviders } from 'src/models/subscription/subscription.providers';

@Module({
  imports: [DatabaseModule, LoggerModule],
  providers: [
    ImpayesService,
    ...impayeProviders,
    ...customerProviders,
    ...subscriptionProviders,
  ],
  controllers: [ImpayesController],
})
export class ImpayesModule {}
