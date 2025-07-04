import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './infrastructure/controllers/customer.controller';
import { CustomerService } from './applicantion/service/customer.service';
import { Customer } from './domain/entities/customer.entity';
import { CustomerRepository } from './infrastructure/repositories/customer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    {
      provide: 'ICustomerRepository',
      useClass: CustomerRepository,
    },
  ],
})
export class CustomerModule {}
