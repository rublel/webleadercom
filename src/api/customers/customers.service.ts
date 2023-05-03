import { Inject, Injectable } from '@nestjs/common';
import { log } from 'console';
import {
  CUSTOMER_REPOSITORY,
  SUBSCRIPTION_REPOSITORY,
} from 'src/models/constants';
import { Customer } from 'src/models/customer/customer.proxi.entity';
import { Subscription } from 'src/models/subscription/subscription.dwc.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private customerRepository: Repository<Customer>,
    @Inject(SUBSCRIPTION_REPOSITORY)
    private subscriptionRepository: Repository<Subscription>,
  ) {}

  async findById(id: number): Promise<Customer> {
    try {
      return await this.customerRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getClients(query?: string): Promise<Customer[]> {
    try {
      return await this.customerRepository.find({
        where: { status: 'Client' },
      });
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
        .getMany()
        .then((c) =>
          Promise.all(
            c.map(async (c) => {
              const customer = new Customer(c);
              if (customer.isClient) {
                const [month, year] = new Date()
                  .toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: '2-digit',
                  })
                  .split('/');
                const nextMonth = new Date(
                  new Date().setMonth(new Date().getMonth() + 1),
                );
                if (nextMonth.getMonth() === 12) year + 1;

                const lastAmountPaid =
                  await this.subscriptionRepository.findOne({
                    where: {
                      customer_id: customer.id.toString(),
                      month,
                      year,
                      is_paid: true,
                    },
                    order: {
                      id: 'DESC',
                    },
                  });

                if (!lastAmountPaid || lastAmountPaid.monthly_price === 0)
                  return customer;

                customer.lastAmountPaid = {
                  monthly_price: lastAmountPaid.monthly_price,
                  date: `${lastAmountPaid.month}/${lastAmountPaid.year}`,
                };
              }
              return customer;
            }),
          ),
        );
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
