import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateSubscriptionDto } from 'src/models/subscription/subscription.dto';
import { Subscription } from 'src/models/subscription/subscription.dwc.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class SubscriptionsService {
  constructor(
    @Inject('SUBSCRIPTION_REPOSITORY')
    private subscriptionsRepository: Repository<Subscription>,
  ) {}

  async createSubscription(
    subscription: CreateSubscriptionDto,
  ): Promise<MergedSubscriptions> {
    const {
      customer_id,
      activity_id,
      monthly_price,
      start_date,
      payment_method,
    } = subscription;

    const [start_year, start_month] = start_date.split('-');
    const subscriptions: Subscription[] = [];
    const subscription_id = uuid();
    for (let i = Number(start_month); i < 13; i++) {
      subscriptions.push(
        new Subscription({
          subscription_id,
          customer_id,
          activity_id,
          monthly_price,
          month: String(i),
          year: String(start_year),
          payment_method,
          is_paid: payment_method === 'SEPA',
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
              activity_id: curr.activity_id,
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
}

export type MergedSubscriptions = {
  customer_id: string;
  activity_id: string;
  subscription: Partial<Subscription>[];
};
