import { BadRequestException } from '@nestjs/common';

export function validationExceptionFactory(errors: any[]) {
  const messages = errors.map(error => 
    Object.values(error.constraints || {}).join(', ')
  );
  return new BadRequestException({
    message: 'Error de validación',
    errors: messages,
  });
} 