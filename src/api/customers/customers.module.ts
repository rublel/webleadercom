import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/mysql/database.module';
import { customerProviders } from 'src/models/customers/customers.providers';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomersController],
  providers: [CustomersService, ...customerProviders],
})
export class CustomersModule {}
