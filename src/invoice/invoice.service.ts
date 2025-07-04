import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { InvoiceDetail } from './entities/invoice-detail.entity';
import { Customer } from '../customer/domain/entities/customer.entity';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class InvoiceService {
  private readonly logger = new Logger(InvoiceService.name);

  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(InvoiceDetail)
    private readonly invoiceDetailRepository: Repository<InvoiceDetail>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    this.logger.log(`Creating new invoice: ${JSON.stringify(createInvoiceDto)}`);

    // Verifica si el cliente existe
    const customer = await this.customerRepository.findOne({ 
      where: { id: createInvoiceDto.customerId } 
    });
    if (!customer) {
      this.logger.error(`Customer with ID ${createInvoiceDto.customerId} not found`);
      throw new NotFoundException(`Customer with ID ${createInvoiceDto.customerId} not found`);
    }

    // Crear la factura
    const invoice = this.invoiceRepository.create({
      invoiceDate: createInvoiceDto.invoiceDate,
      totalAmount: createInvoiceDto.totalAmount.toString(),
      customer: customer,
    });

    const savedInvoice = await this.invoiceRepository.save(invoice);
    this.logger.log(`Invoice created with ID: ${savedInvoice.id}`);

    // Crear los detalles de la factura
    for (const detailDto of createInvoiceDto.details) {
      this.logger.log(`Processing detail for product ID: ${detailDto.productId}`);

      // Verificar que el producto existe
      const product = await this.productRepository.findOne({ 
        where: { id: detailDto.productId } 
      });
      if (!product) {
        this.logger.error(`Product with ID ${detailDto.productId} not found`);
        throw new NotFoundException(`Product with ID ${detailDto.productId} not found`);
      }

      // Verificar stock disponible
      if (product.availableQuantity < detailDto.quantity) {
        this.logger.error(`Insufficient stock for product ${product.name}. Available: ${product.availableQuantity}, Requested: ${detailDto.quantity}`);
        throw new NotFoundException(`Insufficient stock for product ${product.name}`);
      }

      // Crear el detalle
      const detail = this.invoiceDetailRepository.create({
        quantity: detailDto.quantity,
        price: detailDto.price.toString(),
        invoice: savedInvoice,
        product: product,
      });

      await this.invoiceDetailRepository.save(detail);
      this.logger.log(`Detail created for product: ${product.name}`);

      // Actualizar stock del producto
      product.availableQuantity -= detailDto.quantity;
      await this.productRepository.save(product);
      this.logger.log(`Stock updated for product ${product.name}. New available: ${product.availableQuantity}`);
    }

    // Retornar la factura completa con detalles
    const completeInvoice = await this.invoiceRepository.findOne({
      where: { id: savedInvoice.id },
      relations: ['details', 'details.product', 'customer'],
    });

    if (!completeInvoice) {
      this.logger.error(`Failed to retrieve created invoice with ID: ${savedInvoice.id}`);
      throw new NotFoundException(`Failed to retrieve created invoice`);
    }

    this.logger.log(`Invoice creation completed successfully. ID: ${completeInvoice.id}`);
    return completeInvoice;
  }

  async findAll(): Promise<Invoice[]> {
    this.logger.log('Fetching all invoices from database');

    const invoices = await this.invoiceRepository.find({
      relations: ['details', 'details.product', 'customer'],
    });

    this.logger.log(`Found ${invoices.length} invoices`);
    return invoices;
  }

  async findOne(id: number): Promise<Invoice> {
    this.logger.log(`Searching for invoice with ID: ${id}`);

    const invoice = await this.invoiceRepository.findOne({
      where: { id },
      relations: ['details', 'details.product', 'customer'],
    });

    if (!invoice) {
      this.logger.warn(`Invoice with ID ${id} not found`);
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    this.logger.log(`Invoice found: ID ${invoice.id}, Customer: ${invoice.customer.name}`);
    return invoice;
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto): Promise<Invoice> {
    this.logger.log(`Updating invoice with ID: ${id}, data: ${JSON.stringify(updateInvoiceDto)}`);

    const invoice = await this.findOne(id);
    
    // Actualizar campos básicos si se proporcionan
    if (updateInvoiceDto.invoiceDate) {
      invoice.invoiceDate = updateInvoiceDto.invoiceDate;
    }
    if (updateInvoiceDto.totalAmount) {
      invoice.totalAmount = updateInvoiceDto.totalAmount.toString();
    }
    if (updateInvoiceDto.customerId) {
      const customer = await this.customerRepository.findOne({ 
        where: { id: updateInvoiceDto.customerId } 
      });
      if (!customer) {
        this.logger.error(`Customer with ID ${updateInvoiceDto.customerId} not found`);
        throw new NotFoundException(`Customer with ID ${updateInvoiceDto.customerId} not found`);
      }
      invoice.customer = customer;
    }

    const updatedInvoice = await this.invoiceRepository.save(invoice);
    this.logger.log(`Invoice updated successfully: ID ${updatedInvoice.id}`);

    // Retornar la factura completa
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Attempting to remove invoice with ID: ${id}`);

    const invoice = await this.findOne(id);

    // Restaurar stock de productos antes de eliminar
    for (const detail of invoice.details) {
      const product = await this.productRepository.findOne({ 
        where: { id: detail.product.id } 
      });
      if (product) {
        product.availableQuantity += detail.quantity;
        await this.productRepository.save(product);
        this.logger.log(`Stock restored for product ${product.name}. New available: ${product.availableQuantity}`);
      }
    }

    // Eliminar detalles primero
    await this.invoiceDetailRepository.remove(invoice.details);
    this.logger.log(`Invoice details removed for invoice ID: ${id}`);

    // Eliminar la factura
    await this.invoiceRepository.remove(invoice);
    this.logger.log(`Invoice removed successfully: ID ${id}`);
  }
}
