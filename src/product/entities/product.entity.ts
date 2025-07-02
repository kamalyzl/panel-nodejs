import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { InvoiceDetail } from '../../invoice/entities/invoice-detail.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'total_quantity', type: 'int' })
  totalQuantity: number;

  @Column({ name: 'available_quantity', type: 'int' })
  availableQuantity: number;

  @Column({ nullable: true })
  category: string;

  @Column({ type: 'float' })
  price: number;

  @OneToMany(() => InvoiceDetail, (detail) => detail.product)
  invoiceDetails: InvoiceDetail[];
}
