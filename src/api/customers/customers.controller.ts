import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Customer } from 'src/models/customer/customer.entity';
import { CustomersService } from './customers.service';

@ApiTags('Customers')
@Controller()
export class CustomersController {
  constructor(private customerService: CustomersService) {}
  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all customers.',
    type: [Customer],
  })
  findAll(@Query('activity') activity: string) {
    return this.customerService.findAll(activity);
  }
}
