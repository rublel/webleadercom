import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggingInterceptor } from 'src/common/interceptors/logger.interceptor';
import { Customer } from 'src/models/customer/customer.proxi.entity';
import { CustomersService } from './customers.service';

@ApiTags('Customers')
@UseInterceptors(LoggingInterceptor)
@Controller()
export class CustomersController {
  constructor(private customerService: CustomersService) {}
  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get customer by id',
    type: Customer,
  })
  findById(@Query('id') id: number): Promise<Customer> {
    return this.customerService.findById(id);
  }
}
