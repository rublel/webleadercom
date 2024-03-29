import { ApiProperty } from '@nestjs/swagger';
import { Subscription } from './subscription.dwc.entity';

export class SubscriptionDto {
  @ApiProperty({ type: String, description: 'Customer ID', required: true })
  readonly customer_id: string;

  @ApiProperty({ type: Number, description: 'Monthly Price', required: true })
  readonly monthly_price: number;

  @ApiProperty({ type: String, description: 'Start Date', required: true })
  readonly start_date: string;

  @ApiProperty({ type: String, description: 'Payment Method', required: true })
  readonly payment_method: string;
}

export class MergedSubscriptions {
  @ApiProperty({ type: String, description: 'Customer ID' })
  customer_id: string;

  @ApiProperty({ type: [Subscription], description: 'Subscription per month' })
  subscription: Partial<Subscription>[];
}
