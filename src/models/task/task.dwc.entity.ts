import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
export class Task {
  @ApiProperty({ type: Number, description: 'Task ID' })
  @PrimaryGeneratedColumn()
  task_id: number;

  @ApiProperty({ type: String, description: 'Customer ID' })
  @Column()
  customer_id: string;

  @ApiProperty({ type: String, description: 'Task Name' })
  @Column({ type: 'enum', enum: ['insert', 'update', 'delete'] })
  actions: string;

  @ApiProperty({ type: String, description: 'Task type' })
  @Column({ type: 'enum', enum: ['subscription', 'rib'] })
  type: string;

  @ApiProperty({ type: String, description: 'Start Date' })
  @Column()
  start_date: string;

  @ApiProperty({ type: String, description: 'Monthly Price' })
  @Column()
  monthly_price: number;

  @ApiProperty({ type: String, description: 'Status' })
  @Column({ type: 'enum', enum: ['pending', 'done'] })
  status: string;
}
