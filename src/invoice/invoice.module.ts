import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { Invoice } from './entities/invoice.entity';
import { InvoiceDetail } from './entities/invoice-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, InvoiceDetail])],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
