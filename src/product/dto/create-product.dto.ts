import { IsString, IsNumber, IsOptional, Min, IsPositive, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsPositive()
  @Min(0)
  totalQuantity: number;

  @IsNumber()
  @IsPositive()
  @Min(0)
  availableQuantity: number;

  @IsString()
  @IsOptional()
  category?: string;

  @IsNumber()
  @IsPositive()
  price: number;
}
