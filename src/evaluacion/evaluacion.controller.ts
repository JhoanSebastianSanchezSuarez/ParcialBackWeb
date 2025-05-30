import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';
import { EvaluacionEntity } from './evaluacion.entity';
import { Long } from 'typeorm';

@Controller('evaluaciones')
export class EvaluacionController {
  constructor(private readonly evaluacionService: EvaluacionService) {}

  @Post()
  async crearEvaluacion(@Body() evaluacion: EvaluacionEntity) {
    return await this.evaluacionService.crearEvaluacion(evaluacion);
  }

  @Get(':id')
  async findOne(@Param('id') id: Long) {
    return await this.evaluacionService.findEvaluacionById(id);
  }
}
