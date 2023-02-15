import { Inject, Injectable } from '@nestjs/common';
import { CUSTOMER_REPOSITORY } from 'src/models/constants';
import { Customer } from 'src/models/customer/customer.proxi.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private customerRepository: Repository<Customer>,
  ) {}

  async findById(id: number): Promise<Customer> {
    try {
      return await this.customerRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(error);
    }
  }

  async search(queryString: string): Promise<Customer[]> {
    try {
      const query = { queryString: `%${queryString}%` };
      return await this.customerRepository
        .createQueryBuilder('customer')
        .where('customer.id LIKE :queryString', query)
        .orWhere('customer.nom LIKE :queryString', query)
        .orWhere('customer.mail LIKE :queryString', query)
        .getMany();
    } catch (error) {
      throw new Error(error);
    }
  }
}
