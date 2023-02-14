import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('prestataire')
export class Customer {
  @ApiProperty({ type: Number, description: 'Customer ID' })
  @PrimaryColumn()
  public id: number;

  @ApiProperty({ type: String, description: 'Customer name' })
  @Column({ length: 100 })
  public nom: string;

  @ApiProperty({ type: String, description: 'Customer email' })
  @Column({ length: 100 })
  public mail: string;

  @ApiProperty({ type: String, description: 'Customer phone' })
  @Column({ length: 100 })
  public portable: string;

  @ApiProperty({ type: String, description: 'Customer address' })
  @Column({ length: 100 })
  public activite: string;

  @ApiProperty({ type: String, description: 'Customer address' })
  @Column({ length: 100 })
  public departement: string;

  @ApiProperty({ type: String, description: 'Customer address' })
  @Column({ length: 100 })
  public region: string;

  @ApiProperty({ type: String, description: 'Customer address' })
  @Column({ length: 100 })
  public cp: string;

  @ApiProperty({ type: String, description: 'Customer address' })
  @Column({ length: 100 })
  public pays: string;

  @ApiProperty({ type: String, description: 'Customer address' })
  @Column()
  public radius: number;

  @ApiProperty({ type: String, description: 'Customer address' })
  @Column()
  public nbrpresta: number;

  // @Column({ type: 'json', nullable: true })
  // public work_cp: string;

  constructor(partial: Partial<Customer>) {
    Object.assign(this, partial);
  }
}
