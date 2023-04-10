import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('prestataire')
export class Customer {
  @ApiProperty({ type: Number, description: 'Customer ID' })
  @PrimaryColumn()
  public id: number;

  @ApiProperty({ type: String, description: 'Customer name' })
  @Column({ length: 100, name: 'nom' })
  public name: string;

  @ApiProperty({ type: String, description: 'Customer email' })
  @Column({ length: 100, name: 'mail' })
  public email: string;

  @ApiProperty({ type: String, description: 'Customer phone' })
  @Column({ length: 100, name: 'portable' })
  public phone: string;

  @ApiProperty({ type: String, description: 'Customer activity' })
  @Column({ length: 100, name: 'activite' })
  public activity: string;

  @ApiProperty({ type: String, description: 'Customer address' })
  @Column({ length: 100 })
  public departement: string;

  @ApiProperty({ type: String, description: 'Customer address' })
  @Column({ length: 100 })
  public region: string;

  @ApiProperty({ type: String, description: 'Customer address' })
  @Column({ length: 100, name: 'cp' })
  public zip: string;

  @ApiProperty({ type: String, description: 'Customer address' })
  @Column({ length: 100, name: 'pays' })
  public country: string;

  @ApiProperty({ type: String, description: 'Customer address' })
  @Column()
  public radius: number;

  @ApiProperty({ type: String, description: 'Customer address' })
  @Column({ name: 'nbrpresta' })
  public nbr_presta: number;

  @ApiProperty({ type: String, description: 'Status' })
  @Column({ length: 100, name: 'status_presta' })
  public status: string;

  @ApiProperty({ type: Boolean, description: 'Is client' })
  public isClient: boolean;

  @ApiProperty({ type: String, description: 'Affectation' })
  @Column({ length: 100 })
  public affectation: string;

  @ApiProperty({ type: String, description: 'Send by channel' })
  @Column({ length: 100, name: 'send_by' })
  public send_by: string;

  @ApiProperty({ type: String, description: 'Proprieaire' })
  @Column({ length: 100, name: 'proprietaire' })
  public sa_name: string;

  @ApiProperty({ type: String, description: 'Creation date' })
  @Column({ length: 100, name: 'date_creation' })
  public creation_date: string;

  // @Column({ type: 'json', nullable: true })
  // public work_cp: string;

  constructor(partial: Partial<Customer>) {
    Object.assign(this, partial);
    this.isClient = ['client', 'premium'].includes(this.status);
  }
}
