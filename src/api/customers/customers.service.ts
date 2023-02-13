import { Inject, Injectable } from '@nestjs/common';
import { Customer } from 'src/models/customer/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @Inject('CUSTOMER_REPOSITORY')
    private customerRepository: Repository<Customer>,
  ) {}

  async findAll(activity: string): Promise<Customer[] | {}> {
    console.log('activity', activity);

    try {
      const customers = await this.customerRepository.find({
        where: { activite: activity },
      });
      return customers.length ? customers : { message: 'No customers found' };
    } catch (error) {
      console.log(error);
    }
  }
}
