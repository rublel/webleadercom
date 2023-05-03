import { Inject, Injectable } from '@nestjs/common';
import { log } from 'console';
import { Subscription } from 'src/models/subscription/subscription.dwc.entity';
import {
  CUSTOMER_REPOSITORY,
  SUBSCRIPTION_REPOSITORY,
  TASK_REPOSITORY,
} from 'src/models/constants';
import { Customer } from 'src/models/customer/customer.proxi.entity';
import { Task } from 'src/models/task/task.dwc.entity';
import { PaymentStatus } from 'src/types/payment-status';
import { Repository } from 'typeorm';
import { CreateTaskDto } from 'src/models/task/task.dto';

@Injectable()
export class TasksService {
  constructor(
    @Inject(TASK_REPOSITORY)
    private taskRepository: Repository<Task>,
    @Inject(CUSTOMER_REPOSITORY)
    private customerRepository: Repository<Customer>,
    @Inject(SUBSCRIPTION_REPOSITORY)
    private subscriptionRepository: Repository<Subscription>,
  ) {}
  async findByPeriod(month: string, year: string) {
    const tasks = await this.taskRepository.find({
      where: { month, year },
    });

    const result = { insert: [], update: [], delete: [] };
    for (const task of tasks) {
      const { actions, ...rest } = task;
      const customer = await this.customerRepository.findOneBy({
        id: +task.customer_id,
      });
      delete customer?.status;
      result[actions].push({ ...rest, ...customer });
    }
    return result;
  }

  async updateStatus(subscription_id: string, month: string) {
    const currentyear = new Date().getFullYear();
    const task = await this.taskRepository.findOneBy({
      subscription_id,
    });
    const status =
      task.status === PaymentStatus.DONE
        ? PaymentStatus.PENDING
        : PaymentStatus.DONE;

    this.subscriptionRepository.update({ subscription_id }, { status });

    if (status === PaymentStatus.DONE) {
      const subscriptions = [];
      for (let i = Number(month); i < 13; i++) {
        subscriptions.push(
          new Subscription({
            subscription_id,
            customer_id: task.customer_id,
            monthly_price: task.monthly_price,
            month: i < 10 ? `0${i}` : String(i),
            year: String(currentyear),
            payment_method: 'SEPA',
            is_paid: true,
            status: PaymentStatus.DONE,
          }),
        );
      }
      await Promise.all(
        subscriptions.map(async (subscription) => {
          const sub = await this.subscriptionRepository.findOneBy({
            subscription_id,
            month: subscription.month,
            year: subscription.year,
          });
          if (!sub) {
            await this.subscriptionRepository.save(subscription);
          } else {
            await this.subscriptionRepository.update(
              { subscription_id, month: subscription.month },
              { status: PaymentStatus.DONE },
            );
          }
        }),
      );
    } else {
      await this.subscriptionRepository.update(
        { subscription_id },
        { status: PaymentStatus.PENDING },
      );
    }

    return await this.taskRepository.update({ subscription_id }, { status });
  }

  async create(createTaskDto: CreateTaskDto) {
    const { customer_id, type, actions, month, year, monthly_price } =
      createTaskDto;
    const subscription = await this.subscriptionRepository.findOneBy({
      customer_id,
      month,
      year,
    });
    return await this.taskRepository.save({
      customer_id,
      subscription_id: subscription?.subscription_id,
      actions,
      type,
      month: +month < 10 ? `0${month}` : String(month),
      year,
      monthly_price: +monthly_price || subscription?.monthly_price,
    });
  }
}
