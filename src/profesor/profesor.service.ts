import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Long, Repository } from 'typeorm';
import { ProfesorEntity } from './profesor.entity';
import { EvaluacionEntity } from '../evaluacion/evaluacion.entity';

@Injectable()
export class ProfesorService {
  constructor(
    @InjectRepository(ProfesorEntity)
    private readonly profesorRepository: Repository<ProfesorEntity>,
    @InjectRepository(EvaluacionEntity)
    private readonly evaluacionRepository: Repository<EvaluacionEntity>,
  ) {}

  async crearProfesor(profesor: ProfesorEntity): Promise<ProfesorEntity> {
    if (!/^\d{5}$/.test(profesor.extension.toString())) {
      throw new BadRequestException(
        'La extensión debe tener exactamente 5 dígitos',
      );
    }

    return await this.profesorRepository.save(profesor);
  }

  async asignarEvaluador(profesorId: Long): Promise<ProfesorEntity> {
    const profesor = await this.profesorRepository.findOne({
      where: { id: profesorId },
      relations: ['evaluaciones'],
    });

    if (!profesor) {
      throw new BadRequestException(`Profesor con id no encontrado`);
    }

    const evaluacionesActivas = await this.evaluacionRepository
      .createQueryBuilder('evaluacion')
      .where('evaluacion.profesorId = :profesorId', { profesorId })
      .andWhere('evaluacion.activa = :activa', { activa: true })
      .getCount();

    if (evaluacionesActivas >= 3) {
      throw new BadRequestException(
        'El profesor ya tiene 3 evaluaciones activas y no puede aceptar más',
      );
    }

    if (!profesor.esParEvaluador) {
      profesor.esParEvaluador = true;
      await this.profesorRepository.save(profesor);
    }

    return profesor;
  }

  async findProfesorById(id: Long): Promise<ProfesorEntity> {
    const profesor = await this.profesorRepository.findOne({
      where: { id },
      relations: ['evaluaciones', 'mentorias'],
    });

    if (!profesor) {
      throw new BadRequestException(`Profesor con id no encontrado`);
    }

    return profesor;
  }
}
