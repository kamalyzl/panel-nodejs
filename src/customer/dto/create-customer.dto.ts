import { IsNotEmpty, IsEmail, Length, Matches, IsString, IsOptional } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(2, 50, { message: 'El nombre debe tener entre 2 y 50 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  @Length(2, 50, { message: 'El apellido debe tener entre 2 y 50 caracteres' })
  lastname: string;

  @IsNotEmpty({ message: 'El DNI es obligatorio' })
  @Length(8, 8, { message: 'El DNI debe tener exactamente 8 dígitos' })
  @Matches(/^\d+$/, { message: 'El DNI debe contener solo números' })
  dni: string;

  @IsNotEmpty({ message: 'La dirección es obligatoria' })
  @IsString({ message: 'La dirección debe ser una cadena de texto' })
  @Length(10, 200, { message: 'La dirección debe tener entre 10 y 200 caracteres' })
  address: string;

  @IsNotEmpty({ message: 'El número de teléfono es obligatorio' })
  @Matches(/^\+?[\d\s\-\(\)]+$/, { message: 'El número de teléfono debe tener un formato válido' })
  @Length(7, 15, { message: 'El número de teléfono debe tener entre 7 y 15 caracteres' })
  numberPhone: string;

  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  email: string;
}