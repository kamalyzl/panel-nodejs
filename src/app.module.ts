import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer/domain/entities/customer.entity';
import { InvoiceModule } from './invoice/invoice.module';
import { ProductModule } from './product/product.module';
import { Invoice } from './invoice/entities/invoice.entity';
import { InvoiceDetail } from './invoice/entities/invoice-detail.entity';
import { Product } from './product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'storedb',
      entities: [Customer, Invoice, InvoiceDetail, Product],
      synchronize: false, // Deshabilitado para evitar conflictos con esquema existente
    }),
    CustomerModule,
    InvoiceModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
