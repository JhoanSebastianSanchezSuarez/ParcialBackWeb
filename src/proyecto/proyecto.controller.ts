import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoEntity } from './proyecto.entity';
import { Long } from 'typeorm';

@Controller('proyectos')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Post()
  async crearProyecto(@Body() proyecto: ProyectoEntity) {
    return await this.proyectoService.crearProyecto(proyecto);
  }

  @Put(':id/avanzar')
  async avanzarProyecto(@Param('id') id: Long) {
    return await this.proyectoService.avanzarProyecto(id);
  }

  @Get(':id/estudiantes')
  async findAllEstudiantes(@Param('id') id: Long) {
    return await this.proyectoService.findAllEstudiantes(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: Long) {
    return await this.proyectoService.findProyectoById(id);
  }
}
