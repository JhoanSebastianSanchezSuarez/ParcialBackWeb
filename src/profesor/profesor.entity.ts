import { ProyectoEntity } from 'src/proyecto/proyecto.entity';
import { EvaluacionEntity } from 'src/evaluacion/evaluacion.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Long,
} from 'typeorm';

@Entity()
export class ProfesorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Long;
  @Column()
  cedula: number;
  @Column()
  nombre: string;
  @Column()
  departamento: string;
  @Column()
  extension: number;
  @Column()
  esParEvaluador: boolean;

  @OneToMany(() => ProyectoEntity, (proyecto) => proyecto.mentor)
  mentorias: ProyectoEntity[];

  @OneToMany(() => EvaluacionEntity, (evaluacion) => evaluacion.profesor)
  evaluaciones: EvaluacionEntity[];
}
