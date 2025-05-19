import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { EstudianteEntity } from './estudiante.entity';
import { ProyectoModule } from '../proyecto/proyecto.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EstudianteEntity]),
    forwardRef(() => ProyectoModule),
  ],
  providers: [EstudianteService],
  controllers: [EstudianteController],
  exports: [TypeOrmModule, EstudianteService],
})
export class EstudianteModule {}
