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

  @Column({ length: 100 })
  public portable: string;

  @Column({ length: 100 })
  public activite: string;

  @Column({ length: 100 })
  public departement: string;

  @Column({ length: 100 })
  public region: string;

  @Column({ length: 100 })
  public cp: string;

  @Column({ length: 100 })
  public pays: string;

  @Column()
  public radius: number;

  @Column()
  public nbrpresta: number;

  // @Column({ type: 'json', nullable: true })
  // public work_cp: string;

  constructor(partial: Partial<Customer>) {
    Object.assign(this, partial);
  }
}
