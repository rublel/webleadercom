import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: String, description: 'Subscription ID' })
  @Column()
  subscription_id: string;

  @ApiProperty({ type: String, description: 'Customer ID' })
  @Column()
  customer_id: string;

  @ApiProperty({ type: Number, description: 'Monthly price' })
  @Column({ type: 'float' })
  monthly_price: number;

  @ApiProperty({ type: String, description: 'Month' })
  @Column()
  month: string;

  @ApiProperty({ type: String, description: 'Year' })
  @Column()
  year: string;

  @ApiProperty({ type: String, description: 'Status' })
  @Column()
  status: string;

  @ApiProperty({ type: Boolean, description: 'Is paid' })
  @Column()
  is_paid: boolean;

  @ApiProperty({ type: String, description: 'Payment method' })
  @Column()
  payment_method: string;

  constructor(partials: Partial<Subscription>) {
    Object.assign(this, partials);
  }
}
