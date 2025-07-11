import { Expose } from 'class-transformer';

export class CustomerDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  lastname: string;

  @Expose()
  dni: string;

  @Expose()
  address: string;

  @Expose()
  numberPhone: string;

  @Expose()
  email: string;
} 