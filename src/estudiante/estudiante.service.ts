import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { EstudianteEntity } from './estudiante.entity';
import { Long } from 'typeorm';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(EstudianteEntity)
    private readonly estudianteRepository: Repository<EstudianteEntity>,
  ) {}

  async crearEstudiante(
    estudiante: EstudianteEntity,
  ): Promise<EstudianteEntity> {
    if (estudiante.promedio <= 3.2 || estudiante.semestre < 4) {
      throw new BusinessLogicException(
        'El estudiante no cumple con los requisitos (promedio > 3.2 y semestre ≥ 4)',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    return await this.estudianteRepository.save(estudiante);
  }

  async findEstudianteById(id: Long): Promise<EstudianteEntity> {
    const estudiante = await this.estudianteRepository.findOne({
      where: { id },
      relations: ['proyectos'],
    });
    if (!estudiante) {
      throw new BusinessLogicException(
        `Estudiante con esa id no encontrado`,
        BusinessError.NOT_FOUND,
      );
    }
    return estudiante;
  }

  async eliminarEstudiante(id: Long): Promise<void> {
    const estudiante = await this.findEstudianteById(id);

    if (estudiante.proyectos && estudiante.proyectos.length > 0) {
      throw new BusinessLogicException(
        'No se puede eliminar el estudiante porque tiene proyectos activos',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    await this.estudianteRepository.remove(estudiante);
  }
}
