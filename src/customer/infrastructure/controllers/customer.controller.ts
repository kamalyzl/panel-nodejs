import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CustomerService } from '../../applicantion/service/customer.service';
import { CreateCustomerDto } from '../../dto/create-customer.dto';
import { UpdateCustomerDto } from '../../dto/update-customer.dto';
import { CustomerResponseDto } from '../../dto/customer-response.dto';

@Controller('api/customers')
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  @Post()
  async create(@Body() dto: CreateCustomerDto) {
    const customer = await this.service.create(dto);
    return plainToInstance(CustomerResponseDto, customer, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  async findAll() {
    const customers = await this.service.findAll();
    return customers.map((c) =>
      plainToInstance(CustomerResponseDto, c, {
        excludeExtraneousValues: true,
      })
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const customer = await this.service.findOne(id);
    return plainToInstance(CustomerResponseDto, customer, {
      excludeExtraneousValues: true,
    });
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCustomerDto,
  ) {
    const customer = await this.service.update(id, dto);
    return plainToInstance(CustomerResponseDto, customer, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
