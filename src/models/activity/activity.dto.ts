import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '../customer/customer.proxi.entity';

export class CreateActivityDto {
  @ApiProperty({ type: String, description: 'Activity title', required: true })
  readonly title: string;

  @ApiProperty({
    type: String,
    description: 'Activity description',
    required: true,
  })
  readonly description: string;

  @ApiProperty({
    type: String,
    description: 'Activity location',
    required: true,
  })
  readonly customers: Customer[];
}
