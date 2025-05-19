import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluacionService } from './evaluacion.service';
import { EvaluacionController } from './evaluacion.controller';
import { EvaluacionEntity } from './evaluacion.entity';
import { ProyectoModule } from '../proyecto/proyecto.module';
import { ProfesorModule } from '../profesor/profesor.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EvaluacionEntity]),
    forwardRef(() => ProyectoModule),
    forwardRef(() => ProfesorModule),
  ],
  providers: [EvaluacionService],
  controllers: [EvaluacionController],
  exports: [TypeOrmModule, EvaluacionService],
})
export class EvaluacionModule {}
