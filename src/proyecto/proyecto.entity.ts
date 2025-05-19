import {
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Entity,
  Column,
  Long,
} from 'typeorm';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity';
import { EvaluacionEntity } from 'src/evaluacion/evaluacion.entity';
import { ProfesorEntity } from 'src/profesor/profesor.entity';

@Entity()
export class ProyectoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Long;

  @Column()
  titulo: string;

  @Column()
  area: string;

  @Column('decimal', { precision: 10, scale: 2 })
  presupuesto: number;

  @Column({ default: 0 })
  estado: number;

  @Column()
  fechaInicio: string;

  @Column({ nullable: true })
  fechaFin: string;

  @OneToMany(() => EvaluacionEntity, (evaluacion) => evaluacion.proyecto)
  evaluaciones: EvaluacionEntity[];

  @ManyToOne(() => EstudianteEntity, (estudiante) => estudiante.proyectos)
  lider: EstudianteEntity;

  @ManyToOne(() => ProfesorEntity, (profesor) => profesor.mentorias)
  mentor: ProfesorEntity;
}
