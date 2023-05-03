export class CreateTaskDto {
  public readonly customer_id: string;
  public readonly month: string;
  public readonly year: string;
  public readonly type: string;
  public readonly monthly_price: number;
  actions?: 'insert' | 'update' | 'delete';
}
