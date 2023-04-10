import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';
import { PaymentMethod } from 'src/types/payment-method';

export class CreateImpayeDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'Customer Id', required: true })
  readonly customer_id: number;

  @IsString()
  @ApiProperty({ type: String, description: 'Month', required: true })
  readonly month: string;

  @IsString()
  @ApiProperty({ type: String, description: 'Year', required: true })
  readonly year: string;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'Amount', required: true })
  readonly monthly_price: number;

  @IsString()
  @ApiProperty({ type: String, description: 'Status', required: true })
  readonly payment_status: PaymentMethod;

  @IsDateString()
  @ApiProperty({ type: Date, description: 'Date', required: true })
  readonly date: Date;

  @IsString()
  @ApiProperty({ type: String, description: 'Payment Method', required: true })
  readonly payment_method: string;

  @IsDateString()
  @ApiProperty({ type: Date, description: 'Payment Date', required: true })
  readonly payment_date: Date;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'Payment Amount', required: true })
  readonly payment_amount: number;
}
