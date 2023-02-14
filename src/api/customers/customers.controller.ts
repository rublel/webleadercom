import { Controller, Get, Param } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
import { CustomersService } from './customers.service';

// @ApiTags('Customer')
@Controller()
export class CustomersController {
  constructor(private customerService: CustomersService) {}
  @Get()
  findAll() {
    return this.customerService.findAll();
  }
}
