import { ProyectoEntity } from 'src/proyecto/proyecto.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class EstudianteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  nombre: string;
  @Column()
  semestre: number;
  @Column()
  programa: string;
  @Column()
  promedio: number;

  @OneToMany(() => ProyectoEntity, (proyecto) => proyecto.lider)
  proyectos: ProyectoEntity[];
}
