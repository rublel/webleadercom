import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
export class Task {
  @ApiProperty({ type: Number, description: 'Task ID' })
  @PrimaryGeneratedColumn()
  task_id: number;

  @ApiProperty({ type: String, description: 'Subscription ID' })
  @Column()
  subscription_id: string;

  @ApiProperty({ type: String, description: 'Customer ID' })
  @Column()
  customer_id: string;

  @ApiProperty({ type: String, description: 'Task Name' })
  @Column({ type: 'enum', enum: ['insert', 'update', 'delete'] })
  actions: string;

  @ApiProperty({ type: String, description: 'Task type' })
  @Column({
    type: 'enum',
    enum: ['subscription', 'rib'],
    default: 'subscription',
  })
  type: string;

  @ApiProperty({ type: String, description: 'Month' })
  @Column()
  month: string;

  @ApiProperty({ type: String, description: 'Year' })
  @Column()
  year: string;

  @ApiProperty({ type: String, description: 'Monthly Price' })
  @Column()
  monthly_price: number;

  @ApiProperty({ type: String, description: 'Status' })
  @Column({ type: 'enum', enum: ['pending', 'done'], default: 'pending' })
  status: string;

  @ApiProperty({ type: String, description: 'List ID' })
  @Column({ type: 'enum', enum: ['1', '2'], default: '2' })
  list_id: string;
}
