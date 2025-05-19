import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Long, Repository } from 'typeorm';
import { EvaluacionEntity } from './evaluacion.entity';
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { ProfesorEntity } from '../profesor/profesor.entity';

@Injectable()
export class EvaluacionService {
  constructor(
    @InjectRepository(EvaluacionEntity)
    private readonly evaluacionRepository: Repository<EvaluacionEntity>,
    @InjectRepository(ProyectoEntity)
    private readonly proyectoRepository: Repository<ProyectoEntity>,
    @InjectRepository(ProfesorEntity)
    private readonly profesorRepository: Repository<ProfesorEntity>,
  ) {}

  async crearEvaluacion(
    evaluacion: EvaluacionEntity,
  ): Promise<EvaluacionEntity> {
    if (evaluacion.calificacion < 0 || evaluacion.calificacion > 5) {
      throw new BadRequestException('La calificación debe estar entre 0 y 5');
    }

    const proyecto = await this.proyectoRepository.findOne({
      where: { id: evaluacion.proyecto.id },
      relations: ['mentor'],
    });

    if (!proyecto) {
      throw new BadRequestException('El proyecto especificado no existe');
    }

    const profesor = await this.profesorRepository.findOne({
      where: { id: evaluacion.profesor.id },
    });

    if (!profesor) {
      throw new BadRequestException('El profesor evaluador no existe');
    }

    // Validar que el evaluador no sea el mentor del proyecto
    if (proyecto.mentor && proyecto.mentor.id === evaluacion.profesor.id) {
      throw new BadRequestException(
        'El evaluador no puede ser el mentor del proyecto',
      );
    }

    if (!profesor.esParEvaluador) {
      throw new BadRequestException('El profesor asignado no es par evaluador');
    }

    return await this.evaluacionRepository.save(evaluacion);
  }

  async findEvaluacionById(id: Long): Promise<EvaluacionEntity> {
    const evaluacion = await this.evaluacionRepository.findOne({
      where: { id },
      relations: ['proyecto', 'profesor'],
    });

    if (!evaluacion) {
      throw new BadRequestException(`Evaluación con id no encontrada`);
    }

    return evaluacion;
  }
}
