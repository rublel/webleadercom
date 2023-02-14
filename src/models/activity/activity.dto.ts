import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '../customer/customer.proxi.entity';

export class CreateActivityDto {
  @ApiProperty({ required: true })
  readonly title: string;
  @ApiProperty({ required: true })
  readonly description: string;
  @ApiProperty({ required: false })
  readonly customers: Customer[];
}
