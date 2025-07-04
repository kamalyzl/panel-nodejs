import { Inject, Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { ICustomerRepository } from '../../domain/interfaces/customer-repository.interface';
import { Customer } from '../../domain/entities/customer.entity';
import { CreateCustomerDto } from '../../dto/create-customer.dto';
import { UpdateCustomerDto } from '../../dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('ICustomerRepository') private readonly repo: ICustomerRepository,
  ) {}

  async create(dto: CreateCustomerDto): Promise<Customer> {
    // Validar que el DNI no exista
    await this.validateDniUnique(dto.dni);
    
    // Validar que el email no exista
    await this.validateEmailUnique(dto.email);

    const customer = { ...dto } as Customer;
    return this.repo.create(customer);
  }

  findAll(): Promise<Customer[]> {
    return this.repo.findAll();
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.repo.findOne(id);
    if (!customer) throw new NotFoundException('Cliente no encontrado');
    return customer;
  }

  async update(id: number, dto: UpdateCustomerDto): Promise<Customer> {
    // Verificar que el cliente existe
    await this.findOne(id);

    // Si se está actualizando el DNI, validar que sea único
    if (dto.dni) {
      await this.validateDniUnique(dto.dni, id);
    }

    // Si se está actualizando el email, validar que sea único
    if (dto.email) {
      await this.validateEmailUnique(dto.email, id);
    }

    return this.repo.update(id, dto);
  }

  async delete(id: number): Promise<void> {
    // Verificar que el cliente existe
    await this.findOne(id);
    return this.repo.delete(id);
  }

  private async validateDniUnique(dni: string, excludeId?: number): Promise<void> {
    const existingCustomer = await this.repo.findByDni(dni);
    if (existingCustomer && existingCustomer.id !== excludeId) {
      throw new ConflictException('El DNI ya existe en la base de datos');
    }
  }

  private async validateEmailUnique(email: string, excludeId?: number): Promise<void> {
    const existingCustomer = await this.repo.findByEmail(email);
    if (existingCustomer && existingCustomer.id !== excludeId) {
      throw new ConflictException('El email ya existe en la base de datos');
    }
  }
}
