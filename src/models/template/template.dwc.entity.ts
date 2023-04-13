import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('templates')
export class Template {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  subject: string;

  @Column()
  htmlContent: string;
}
