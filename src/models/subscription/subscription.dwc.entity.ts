import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subscription_id: string;

  @Column()
  customer_id: string;

  @Column()
  activity_id: string;

  @Column()
  monthly_price: number;

  @Column()
  month: string;

  @Column()
  year: string;

  @Column()
  status: string;

  @Column()
  is_paid: boolean;

  @Column()
  payment_method: string;

  constructor(partials: Partial<Subscription>) {
    Object.assign(this, partials);
  }
}
