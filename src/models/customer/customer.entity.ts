import {
  Column,
  Entity,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Activity } from '../activity/activity.entity';

@Entity('prestataire')
export class Customer {
  @ApiProperty({ example: 1, description: 'Customer ID' })
  @PrimaryColumn()
  public id: number;

  //email
  @ApiProperty({ example: 'xxx@xxx.io', description: 'Customer email' })
  @Column({ unique: true, length: 100 })
  public mail: string;

  @Column({ length: 100 })
  public activite: string;

  @ManyToMany(() => Activity, (activity) => activity.customers)
  public activities: Activity[];

  constructor(partial: Partial<Customer>) {
    Object.assign(this, partial);
  }
}
