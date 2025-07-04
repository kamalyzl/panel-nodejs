import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Customer } from '../../customer/domain/entities/customer.entity';
import { InvoiceDetail } from './invoice-detail.entity';

@Entity({ name: 'invoices' })
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', name: 'invoice_date' })
  invoiceDate: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'total_amount' })
  totalAmount: string;

  @ManyToOne(() => Customer, (customer) => customer.invoices, { nullable: false, eager: false })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany(() => InvoiceDetail, (detail) => detail.invoice, { cascade: true, eager: false })
  details: InvoiceDetail[];
}