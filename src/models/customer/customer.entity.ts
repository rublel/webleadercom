import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
// import { ApiProperty } from '@nestjs/swagger';

@Entity('customer')
export class Customer {
  // @ApiProperty({ example: 1, description: 'Customer ID' })
  @PrimaryColumn()
  public id: number;

  // @ApiProperty({ example: 'John Doe', description: 'Customer name' })
  @Column({ length: 100 })
  public name: string;

  constructor(partial: Partial<Customer>) {
    Object.assign(this, partial);
  }
}
