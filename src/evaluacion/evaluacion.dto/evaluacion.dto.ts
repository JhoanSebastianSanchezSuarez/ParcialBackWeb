/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsNumber } from 'class-validator';

export class EvaluacionDto {
  @IsNumber()
  @IsNotEmpty()
  readonly calificacion: number;
}
