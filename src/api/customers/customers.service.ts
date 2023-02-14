import { Inject, Injectable } from '@nestjs/common';
import { Customer } from 'src/models/customer/customer.proxi.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @Inject('CUSTOMER_REPOSITORY')
    private customerRepository: Repository<Customer>,
  ) {}

  async findById(id: number): Promise<Customer> {
    try {
      return await this.customerRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(error);
    }
  }
}
