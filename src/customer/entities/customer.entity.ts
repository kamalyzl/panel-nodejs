import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Invoice } from '../../invoice/entities/invoice.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  dni: string;

  @Column()
  address: string;

  @Column({name: 'number_phone'})
  numberPhone: string;

  @Column()
  email: string;

  @OneToMany(() => Invoice, (invoice) => invoice.customer)
  invoices: Invoice[];
}
