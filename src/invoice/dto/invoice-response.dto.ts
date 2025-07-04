import { Expose, Type } from 'class-transformer';
import { CustomerDto } from 'src/customer/dto/customer.dto';

export class InvoiceResponseDto {
  @Expose()
  id: number;

  @Expose()
  code: string;

  @Expose()
  date: Date;

  @Expose()
  @Type(() => CustomerDto)
  customer: CustomerDto;

  @Expose()
  total: number;
}
