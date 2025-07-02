import { Controller, Post, Body, Param, Put, Delete, Get } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('api/customers')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Post()
    create(@Body() dto: CreateCustomerDto) {
      return this.customerService.create(dto);
    }
  
    @Get()
    findAll() {
      return this.customerService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.customerService.findOne(+id);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateCustomerDto) {
      return this.customerService.update(+id, dto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.customerService.remove(+id);
    }
}
