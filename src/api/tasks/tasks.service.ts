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

    return await tasks.reduce(
      async (acc, task) => {
        const { actions, ...rest } = task;
        const customer = await this.customerRepository.findOneBy({
          id: +task.customer_id,
        });
        delete customer.status;
        acc[actions].push({ ...rest, ...customer });
        return acc;
      },
      { insert: [], update: [], delete: [] } as any,
    );
  }

  async updateStatus(subscription_id: string) {
    const { status: currentStatus } = await this.taskRepository.findOneBy({
      subscription_id,
    });
    const status =
      currentStatus === PaymentStatus.DONE
        ? PaymentStatus.PENDING
        : PaymentStatus.DONE;
    this.subscriptionRepository.update({ subscription_id }, { status });
    return await this.taskRepository.update({ subscription_id }, { status });
  }
}
