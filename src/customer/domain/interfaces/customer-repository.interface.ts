import { Customer } from '../entities/customer.entity';

export interface ICustomerRepository {
  findAll(): Promise<Customer[]>;
  findOne(id: number): Promise<Customer>;
  findByDni(dni: string): Promise<Customer | null>;
  findByEmail(email: string): Promise<Customer | null>;
  create(customer: Customer): Promise<Customer>;
  update(id: number, customer: Partial<Customer>): Promise<Customer>;
  delete(id: number): Promise<void>;
}
