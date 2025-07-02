import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Invoice } from './invoice.entity';
  import { Product } from '../../product/entities/product.entity';

  
  @Entity({ name: 'invoice_products' })
  export class InvoiceDetail {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'int' })
    quantity: number;
  
    @Column({ type: 'decimal', precision: 15, scale: 2 })
    price: string;
  
    @ManyToOne(() => Invoice, (invoice) => invoice.details, { nullable: false, eager: false })
    @JoinColumn({ name: 'invoice_id' })
    invoice: Invoice;
  
    @ManyToOne(() => Product, (product) => product.invoiceDetails, { nullable: false, eager: false })
    @JoinColumn({ name: 'product_id' })
    product: Product;
  }
  