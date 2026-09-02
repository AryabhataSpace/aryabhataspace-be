import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import type { ZodSchema, ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      const error = result.error as ZodError;
      const issues = (error as any).issues || (error as any).errors || [];
      const formattedErrors = issues.map((err: any) => ({
        field: Array.isArray(err.path) ? err.path.join('.') : '',
        message: err.message,
      }));

      throw new BadRequestException({
        statusCode: 400,
        message: formattedErrors.length > 0 ? formattedErrors[0].message : 'Validation failed',
        errors: formattedErrors,
        error: 'Bad Request',
      });
    }
    return result.data;
  }
}
