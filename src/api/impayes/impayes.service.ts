import { Inject, Injectable } from '@nestjs/common';
import {
  CUSTOMER_REPOSITORY,
  IMPAYE_REPOSITORY,
  SUBSCRIPTION_REPOSITORY,
} from 'src/models/constants';
import { Customer } from 'src/models/customer/customer.proxi.entity';
import { CreateImpayeDto } from 'src/models/impaye/impaye.dto';
import { Impaye } from 'src/models/impaye/impayes.dwc.entity';
import { Subscription } from 'src/models/subscription/subscription.dwc.entity';
import { PaymentStatus } from 'src/types/payment-status';
import { In, Repository } from 'typeorm';
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
    log(impaye);
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
      },
    });

    return customersWithImpayes.map((impaye) => {
      const customer = customers.find(
        (customer) => customer.id === +impaye.customer_id,
      );
      impaye.payment_method = PaymentMethodFormatter[impaye.payment_method];
      return { ...impaye, ...customer };
    });
  }
}
