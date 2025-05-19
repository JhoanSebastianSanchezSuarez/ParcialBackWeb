import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { ProfesorModule } from './profesor/profesor.module';
import { EvaluacionModule } from './evaluacion/evaluacion.module';
import { EstudianteEntity } from './estudiante/estudiante.entity';
import { ProyectoEntity } from './proyecto/proyecto.entity';
import { EvaluacionEntity } from './evaluacion/evaluacion.entity';
import { ProfesorEntity } from './profesor/profesor.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'parcial',
      entities: [
        EstudianteEntity,
        ProyectoEntity,
        EvaluacionEntity,
        ProfesorEntity,
      ],
      synchronize: true,
    }),
    forwardRef(() => EstudianteModule),
    forwardRef(() => ProyectoModule),
    forwardRef(() => ProfesorModule),
    forwardRef(() => EvaluacionModule),
  ],
})
export class AppModule {}
