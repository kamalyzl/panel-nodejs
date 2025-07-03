import { Type } from 'class-transformer';
import { 
  IsString, 
  IsNumber, 
  IsPositive, 
  IsDateString, 
  IsArray, 
  ValidateNested, 
  IsOptional,
  Min,
  IsNotEmpty,
  IsUUID
} from 'class-validator';

export class CreateInvoiceDetailDto {
  @IsNumber()
  @IsPositive()
  @Min(1)
  quantity: number;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  productId: number;
}

export class CreateInvoiceDto {
  @IsDateString()
  @IsNotEmpty()
  invoiceDate: string;

  @IsNumber()
  @IsPositive()
  totalAmount: number;

  @IsNumber()
  @IsPositive()
  customerId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceDetailDto)
  details: CreateInvoiceDetailDto[];
}
