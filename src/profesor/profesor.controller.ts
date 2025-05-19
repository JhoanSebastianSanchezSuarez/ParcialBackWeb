import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorEntity } from './profesor.entity';
import { Long } from 'typeorm';

@Controller('profesores')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post()
  async crearProfesor(@Body() profesor: ProfesorEntity) {
    return await this.profesorService.crearProfesor(profesor);
  }

  @Post(':id/asignar-evaluador')
  async asignarEvaluador(@Param('id') id: Long) {
    return await this.profesorService.asignarEvaluador(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: Long) {
    return await this.profesorService.findProfesorById(id);
  }
}
