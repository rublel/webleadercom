import { Inject, Injectable } from '@nestjs/common';
import { CUSTOMER_REPOSITORY, IMPAYE_REPOSITORY } from 'src/models/constants';
import { Customer } from 'src/models/customer/customer.proxi.entity';
import { CreateImpayeDto } from 'src/models/impaye/impaye.dto';
import { Impaye } from 'src/models/impaye/impayes.dwc.entity';
import { PaymentStatus } from 'src/types/payment-status';
import { In, Repository } from 'typeorm';

@Injectable()
export class ImpayesService {
  constructor(
    @Inject(IMPAYE_REPOSITORY)
    private impayesRepository: Repository<Impaye>,
    @Inject(CUSTOMER_REPOSITORY)
    private customerRepository: Repository<Customer>,
  ) {}

  create(impayeDto: CreateImpayeDto): Promise<Impaye> {
    const impaye = new Impaye(impayeDto);
    return this.impayesRepository.save(impaye);
  }

  async findByPeriod(month: string, year: string): Promise<any[]> {
    const customersWithImpayes = await this.impayesRepository.find({
      where: { month, year, payment_status: PaymentStatus.UNPAID },
    });

    const customers = await this.customerRepository.find({
      where: {
        id: In(customersWithImpayes.map((impaye) => impaye.customer_id)),
      },
    });

    return customersWithImpayes.map((impaye) => {
      const customer = customers.find(
        (customer) => customer.id === impaye.customer_id,
      );
      return { ...impaye, ...customer };
    });
  }
}
