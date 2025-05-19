import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorService } from './profesor.service';
import { ProfesorController } from './profesor.controller';
import { ProfesorEntity } from './profesor.entity';
import { EvaluacionModule } from '../evaluacion/evaluacion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfesorEntity]),
    forwardRef(() => EvaluacionModule),
  ],
  providers: [ProfesorService],
  controllers: [ProfesorController],
  exports: [TypeOrmModule, ProfesorService],
})
export class ProfesorModule {}
