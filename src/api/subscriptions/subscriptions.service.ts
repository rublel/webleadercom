import { Inject, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import {
  CreateSubscriptionDto,
  MergedSubscriptions,
} from 'src/models/subscription/subscription.dto';
import { Subscription } from 'src/models/subscription/subscription.dwc.entity';
import { v4 as uuid } from 'uuid';
import {
  CUSTOMER_REPOSITORY,
  SUBSCRIPTION_REPOSITORY,
} from 'src/models/constants';
import { Customer } from 'src/models/customer/customer.proxi.entity';
import { PaymentMethodFormatter } from 'src/types/payment-method';

@Injectable()
export class SubscriptionsService {
  constructor(
    @Inject(SUBSCRIPTION_REPOSITORY)
    private subscriptionsRepository: Repository<Subscription>,
    @Inject(CUSTOMER_REPOSITORY)
    private customerRepository: Repository<Customer>,
  ) {}

  async createSubscription(
    subscription: CreateSubscriptionDto,
  ): Promise<MergedSubscriptions> {
    const { customer_id, monthly_price, start_date, payment_method } =
      subscription;

    const [start_year, start_month] = start_date.split('-');
    const subscriptions: Subscription[] = [];
    const subscription_id = uuid();
    for (let i = 1; i < 13; i++) {
      subscriptions.push(
        new Subscription({
          subscription_id,
          customer_id,
          monthly_price,
          month: i < 10 ? `0${i}` : String(i),
          year: String(start_year),
          payment_method,
          is_paid: i < Number(start_month) ? false : payment_method === 'SEPA',
        }),
      );
    }

    try {
      const insertedSubscriptions = await this.subscriptionsRepository.save(
        subscriptions,
      );

      const fomratSubscription = (subscription: Partial<Subscription>) => ({
        month: subscription.month,
        year: subscription.year,
        is_paid: subscription.is_paid,
        payment_method: subscription.payment_method,
      });

      const subscription = insertedSubscriptions.reduce(
        (acc, curr: Subscription) => {
          if (!acc[curr.customer_id])
            acc[curr.customer_id] = {
              customer_id: curr.customer_id,
              subscription: [fomratSubscription(curr)],
            };
          else
            acc[curr.customer_id].subscription.push(fomratSubscription(curr));
          return acc;
        },
        {} as { [key: string]: MergedSubscriptions },
      );

      const [customerSubscription] = Object.values(subscription);
      return customerSubscription;
    } catch (error) {
      console.log(error);
    }
  }

  async findByPeriod(month, year, activity?: string) {
    try {
      const subscriptions = await this.subscriptionsRepository.find({
        where: {
          month,
          year,
        },
      });

      const customers = await this.customerRepository.find({
        where: {
          id: In(subscriptions.map((subscription) => subscription.customer_id)),
          ...(activity && { activity: In(activity.split(',')) }),
        },
      });

      return subscriptions.map((subscription) => {
        const customer = customers.find(
          (customer) => customer.id === +subscription.customer_id,
        );
        subscription.payment_method =
          PaymentMethodFormatter[subscription.payment_method];
        return { ...subscription, ...customer };
      });
    } catch (error) {
      console.log(error);
    }
  }
}
