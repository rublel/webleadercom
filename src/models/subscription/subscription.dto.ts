export class CreateSubscriptionDto {
  customer_id: string;
  activity_id: string;
  monthly_price: number;
  start_date: string;
  payment_method: string;
}
