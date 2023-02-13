import {
  Column,
  Entity,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '../customer/customer.entity';

@Entity('activities')
export class Activity {
  @ApiProperty({ example: 1, description: 'Customer ID', required: false })
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({
    example: 'John Doe',
    description: 'Customer name',
    required: false,
  })
  @Column({ length: 100 })
  public title: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Customer name',
    required: false,
  })
  @Column({ length: 100 })
  public description: string;

  @ManyToMany(() => Customer, (customer) => customer.activities)
  public customers: Customer[];

  constructor(partial: Partial<Activity>) {
    Object.assign(this, partial);
  }
}
