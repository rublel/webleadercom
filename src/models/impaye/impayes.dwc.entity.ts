import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateImpayeDto } from './impaye.dto';

@Entity('impayes')
export class Impaye {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  readonly uuid: string;

  @ApiProperty({ type: Number, description: 'Customer Id of the impaye' })
  @Column()
  readonly customer_id: number;

  @ApiProperty({ type: String, description: 'Month of the impaye' })
  @Column()
  readonly month: string;

  @ApiProperty({ type: String, description: 'Year of the impaye' })
  @Column()
  readonly year: string;

  @ApiProperty({ type: Number, description: 'Amount of the impaye' })
  @Column({ type: 'float' })
  readonly amount: number;

  @ApiProperty({ type: String, description: 'Status of the impaye' })
  @Column()
  readonly payment_status: string;

  @ApiProperty({ type: String, description: 'Payment method of the impaye' })
  @Column()
  readonly payment_method: string;

  @ApiProperty({ type: Date, description: 'Date of the impaye' })
  @Column()
  readonly payment_date: string;

  @ApiProperty({ type: String, description: 'Payment amount of the impaye' })
  @Column()
  readonly payment_amount: string;

  constructor(partials: Impaye | Partial<Impaye> | CreateImpayeDto) {
    Object.assign(this, partials);
  }
}
