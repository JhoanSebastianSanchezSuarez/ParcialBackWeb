import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity';
import { EvaluacionEntity } from 'src/evaluacion/evaluacion.entity';
import { ProfesorEntity } from 'src/profesor/profesor.entity';

export class ProyectoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @OneToMany(() => EvaluacionEntity, (evaluacion) => evaluacion.proyecto)
    evaluaciones: EvaluacionEntity[];

    @ManyToOne(() => EstudianteEntity, (estudiante) => estudiante.proyectos)
    lider: EstudianteEntity;

    @ManyToOne(() => ProfesorEntity, (profesor) => profesor.mentorias)
    mentor: ProfesorEntity;

}
