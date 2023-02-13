import { Inject, Injectable } from '@nestjs/common';
import { Customer } from 'src/models/customers/customers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @Inject('CUSTOMER_REPOSITORY')
    private customerRepository: Repository<Customer>,
  ) {}

  async findAll(): Promise<Customer[] | {}> {
    try {
      const customers = await this.customerRepository.find({ take: 50 });
      return customers.length ? customers : { message: 'No customers found' };
    } catch (error) {
      console.log(error);
    }
  }
}
