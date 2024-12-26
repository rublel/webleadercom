import { Inject, Injectable } from '@nestjs/common';
import {
  CUSTOMER_REPOSITORY,
  SUBSCRIPTION_REPOSITORY,
} from 'src/models/constants';
import { Customer } from 'src/models/customer/customer.proxi.entity';
import { UpdateImpayeDto } from 'src/models/impaye/impaye.dto';
import { Subscription } from 'src/models/subscription/subscription.dwc.entity';
import { PaymentStatus } from 'src/types/payment-status';
import { In, IsNull, Not, Repository } from 'typeorm';
import { PaymentMethodFormatter } from 'src/types/payment-method';
import { SubscriptionDto } from 'src/models/subscription/subscription.dto';
import { log } from 'console';

@Injectable()
export class ImpayesService {
  constructor(
    @Inject(SUBSCRIPTION_REPOSITORY)
    private subscriptionRepository: Repository<Subscription>,
    @Inject(CUSTOMER_REPOSITORY)
    private customerRepository: Repository<Customer>,
  ) {}

  create(impayeDto: SubscriptionDto) {
    const impaye = new Subscription(impayeDto);

    return this.subscriptionRepository.update(
      {
        customer_id: impaye.customer_id,
        month: impaye.month,
        year: impaye.year,
        payment_method: 'SEPA',
      },
      { is_paid: false },
    );
  }

  async findByPeriod(month: string, year: string): Promise<any[]> {
    const customersWithImpayes = await this.subscriptionRepository.find({
      where: { month, year, is_paid: false },
    });

    const customers = await this.customerRepository.find({
      where: {
        id: In(customersWithImpayes.map((impaye) => impaye.customer_id)),
        email: Not(IsNull()),
      },
    });

    return customers.map((customer) => {
      const impaye = customersWithImpayes.find(
        (impaye) => +impaye.customer_id === customer.id,
      );
      impaye.payment_method = PaymentMethodFormatter[impaye.payment_method];
      return { ...impaye, ...customer };
    });
  }

  async findById(
    subscription_id: string,
  ): Promise<Pick<Subscription, 'month' | 'year' | 'monthly_price'>[]> {
    try {
      return this.subscriptionRepository
        .createQueryBuilder('s')
        .select(['s.month', 's.year', 's.monthly_price'])
        .where('subscription_id = :subscription_id', {
          subscription_id,
        })
        .andWhere('is_paid = :is_paid', { is_paid: false })
        .getMany();
    } catch (error) {
      log(error);
    }
  }

  async updateImpayeStatus(body: UpdateImpayeDto) {
    const { subscription_id, month, year, monthly_price } = body;
    log(body);
    try {
      await this.subscriptionRepository.update(
        { subscription_id, month, year },
        { is_paid: true, monthly_price, status: PaymentStatus.DONE },
      );
    } catch (error) {
      log(error);
    }
  }
}
