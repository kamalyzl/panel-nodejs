import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    this.logger.log(`Creating new product: ${JSON.stringify(createProductDto)}`);
    
    const product = this.productRepository.create(createProductDto);
    const savedProduct = await this.productRepository.save(product);
    
    this.logger.log(`Product created successfully with ID: ${savedProduct.id}`);
    return savedProduct;
  }

  async findAll(): Promise<Product[]> {
    this.logger.log('Fetching all products from database');
    
    const products = await this.productRepository.find();
    
    this.logger.log(`Found ${products.length} products`);
    return products;
  }

  async findOne(id: number): Promise<Product> {
    this.logger.log(`Searching for product with ID: ${id}`);
    
    const product = await this.productRepository.findOne({ where: { id } });
    
    if (!product) {
      this.logger.warn(`Product with ID ${id} not found`);
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    this.logger.log(`Product found: ${product.name} (ID: ${product.id})`);
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    this.logger.log(`Updating product with ID: ${id}, data: ${JSON.stringify(updateProductDto)}`);
    
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    const updatedProduct = await this.productRepository.save(product);
    
    this.logger.log(`Product updated successfully: ${updatedProduct.name} (ID: ${updatedProduct.id})`);
    return updatedProduct;
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Attempting to remove product with ID: ${id}`);
    
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
    
    this.logger.log(`Product removed successfully: ${product.name} (ID: ${product.id})`);
  }
}
