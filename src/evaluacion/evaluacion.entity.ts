import { ProfesorEntity } from 'src/profesor/profesor.entity';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class EvaluacionEntity {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @ManyToOne(() => ProyectoEntity, (proyecto) => proyecto.evaluaciones)
    proyecto: ProyectoEntity;

    @ManyToOne(() => ProfesorEntity, (profesor) => profesor.evaluaciones)
    profesor: ProfesorEntity;
}
