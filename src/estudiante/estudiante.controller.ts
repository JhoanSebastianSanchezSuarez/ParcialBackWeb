import {
  Controller,
  Post,
  Delete,
  Body,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { Long } from 'typeorm';

@Controller('estudiantes')
@UseInterceptors(BusinessErrorsInterceptor)
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  async crearEstudiante(@Body() estudiante: EstudianteEntity) {
    return await this.estudianteService.crearEstudiante(estudiante);
  }

  @Delete(':id')
  async eliminarEstudiante(@Param('id') id: Long) {
    return await this.estudianteService.eliminarEstudiante(id);
  }
}
