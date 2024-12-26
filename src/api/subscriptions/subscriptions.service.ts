import { Inject, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import {
  SubscriptionDto,
  MergedSubscriptions,
} from 'src/models/subscription/subscription.dto';
import { Subscription } from 'src/models/subscription/subscription.dwc.entity';
import { v4 as uuid } from 'uuid';
import {
  CUSTOMER_REPOSITORY,
  SUBSCRIPTION_REPOSITORY,
  TASK_REPOSITORY,
} from 'src/models/constants';
import { Customer } from 'src/models/customer/customer.proxi.entity';
import { PaymentMethodFormatter } from 'src/types/payment-method';
import { PaymentStatus } from 'src/types/payment-status';
import { Task } from 'src/models/task/task.dwc.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @Inject(SUBSCRIPTION_REPOSITORY)
    private subscriptionsRepository: Repository<Subscription>,
    @Inject(CUSTOMER_REPOSITORY)
    private customerRepository: Repository<Customer>,
    @Inject(TASK_REPOSITORY)
    private taskRepository: Repository<Task>,
  ) {}

  async createSubscription(
    subscription: SubscriptionDto,
  ): Promise<MergedSubscriptions> {
    const { customer_id, monthly_price, start_date, payment_method } =
      subscription;

    const [start_year, start_month] = start_date.split('-');
    const subscriptions: Subscription[] = [];
    const subscription_id = `${new Date().getTime().toString()}-${uuid()}`;
    for (let i = Number(start_month); i < 13; i++) {
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
      this.customerRepository.update(
        { id: +customer_id },
        { status: 'client' },
      );

      if (payment_method === 'SEPA') {
        this.taskRepository.save({
          customer_id,
          subscription_id,
          actions: 'insert',
          month: start_month,
          year: start_year,
          monthly_price: Number(monthly_price),
        });
      }

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
          is_paid: true,
          status: PaymentStatus.DONE,
        },
      });

      const customers = await this.customerRepository.find({
        where: {
          id: In(subscriptions.map((subscription) => subscription.customer_id)),
          ...(activity && { activity: In(activity.split(',')) }),
        },
      });

      return customers.map((customer) => {
        const subscription = subscriptions.find(
          (subscription) => +subscription.customer_id === customer.id,
        );
        return {
          ...customer,
          ...subscription,
          payment_method: PaymentMethodFormatter[subscription.payment_method],
        };
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteSubscription(
    date: string,
    customer_id: string,
    action: string,
    list_id: string,
  ) {
    try {
      const [year, month] = date.split('-');
      const subscription = await this.subscriptionsRepository.findOne({
        where: { customer_id, month, year },
        select: ['payment_method', 'monthly_price', 'subscription_id'],
      });
      if (subscription) {
        if (subscription.payment_method === 'SEPA') {
          this.taskRepository.save({
            subscription_id: subscription.subscription_id,
            customer_id: customer_id,
            actions: 'delete',
            list_id,
            month,
            year,
            monthly_price: subscription.monthly_price,
            status: PaymentStatus.PENDING,
          });
        }

        await Promise.all(
          Array.from(
            { length: 13 - Number(month) },
            (_, i) => i + Number(month),
          ).map((month) => {
            this.subscriptionsRepository.delete({
              subscription_id: subscription.subscription_id,
              payment_method: subscription.payment_method,
              month: month < 10 ? `0${month}` : String(month),
              year,
            });
          }),
        );
      }

      switch (action) {
        case 'delete':
          this.customerRepository.update(
            {
              id: +customer_id,
            },
            {
              status: 'deleted',
            },
          );
          break;
        case 'update':
          this.customerRepository.update(
            { id: +customer_id },
            { status: 'old' },
          );
          break;
      }
    } catch (error) {
      throw error;
    }
  }
}
