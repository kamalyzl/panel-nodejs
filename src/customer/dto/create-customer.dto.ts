import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  dni: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  numberPhone: string;

  @IsEmail()
  email: string;
}
