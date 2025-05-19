import {
  Column,
  Entity,
  Long,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProyectoEntity } from '../proyecto/proyecto.entity';

@Entity()
export class EstudianteEntity {
  @PrimaryGeneratedColumn()
  id: Long;

  @Column()
  nombre: string;

  @Column('int')
  cedula: number;

  @Column('int')
  semestre: number;

  @Column()
  programa: string;

  @Column('decimal', { precision: 3, scale: 2 })
  promedio: number;

  @OneToMany(() => ProyectoEntity, (proyecto) => proyecto.lider)
  proyectos: ProyectoEntity[];
}
