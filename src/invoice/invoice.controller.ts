import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';

@Controller('api/invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  async create(@Body() createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    return await this.invoiceService.create(createInvoiceDto);
  }

  @Get()
  async findAll(): Promise<Invoice[]> {
    return await this.invoiceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Invoice> {
    return await this.invoiceService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto): Promise<Invoice> {
    return await this.invoiceService.update(+id, updateInvoiceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.invoiceService.remove(+id);
  }
}
