import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private customerRepo: Repository<Customer>,
    ) { }

    create(data: CreateCustomerDto) {
        const customer = this.customerRepo.create(data);
        return this.customerRepo.save(customer);
    }

    findAll() {
        return this.customerRepo.find();
    }

    findOne(id: number) {
        return this.customerRepo.findOneBy({ id });
    }

    async update(id: number, data: UpdateCustomerDto) {
        const customer = await this.customerRepo.findOneBy({ id });
        if (!customer) throw new NotFoundException('Customer not found');
        this.customerRepo.merge(customer, data);
        return this.customerRepo.save(customer);
    }

    async remove(id: number) {
        const customer = await this.customerRepo.findOneBy({ id });
        if (!customer) throw new NotFoundException('Customer not found');
        return this.customerRepo.remove(customer);
    }
}
