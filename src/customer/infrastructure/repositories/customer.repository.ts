import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICustomerRepository } from '../../domain/interfaces/customer-repository.interface';
import { Customer } from '../../domain/entities/customer.entity';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(
    @InjectRepository(Customer)
    private readonly repo: Repository<Customer>,
  ) {}

  findAll(): Promise<Customer[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.repo.findOneBy({ id });
    if (!customer) {
      throw new Error(`Customer with id ${id} not found`);
    }
    return customer;
  }

  findByDni(dni: string): Promise<Customer | null> {
    return this.repo.findOneBy({ dni });
  }

  findByEmail(email: string): Promise<Customer | null> {
    return this.repo.findOneBy({ email });
  }

  create(customer: Customer): Promise<Customer> {
    return this.repo.save(customer);
  }

  async update(id: number, data: Partial<Customer>): Promise<Customer> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}

