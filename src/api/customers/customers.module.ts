import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/mysql/database.module';
import { customerProviders } from 'src/models/customer/customer.providers';
import { LoggerModule } from 'src/utils/looger/logger/logger.module';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
  imports: [DatabaseModule, LoggerModule],
  controllers: [CustomersController],
  providers: [CustomersService, ...customerProviders],
})
export class CustomersModule {}
