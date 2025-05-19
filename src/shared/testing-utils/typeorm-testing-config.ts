/* eslint-disable prettier/prettier */
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluacionEntity } from 'src/evaluacion/evaluacion.entity';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity';
import { ProfesorEntity } from 'src/profesor/profesor.entity';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [EstudianteEntity, ProyectoEntity, EvaluacionEntity, ProfesorEntity],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([EstudianteEntity, ProyectoEntity, EvaluacionEntity, ProfesorEntity]), 
];
