import { IsNotEmpty, IsEmail, Length } from 'class-validator';
import { Column } from 'typeorm';

export class CreateCustomerDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  @Length(8, 8)
  dni: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  numberPhone: string;

  @IsEmail()
  email: string;
}
