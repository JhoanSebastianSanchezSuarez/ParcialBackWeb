import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import { ProyectoEntity } from './proyecto.entity';
import { EstudianteModule } from '../estudiante/estudiante.module';
import { ProfesorModule } from '../profesor/profesor.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProyectoEntity]),
    forwardRef(() => EstudianteModule),
    forwardRef(() => ProfesorModule),
  ],
  providers: [ProyectoService],
  controllers: [ProyectoController],
  exports: [TypeOrmModule, ProyectoService],
})
export class ProyectoModule {}
