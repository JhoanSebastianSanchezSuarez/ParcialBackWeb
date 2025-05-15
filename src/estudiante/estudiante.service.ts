import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(EstudianteEntity)
    private readonly estudianteRepository: Repository<EstudianteEntity>,
  ) {}

  async crearEstudiante(
    estudiante: EstudianteEntity,
  ): Promise<EstudianteEntity> {
    if (estudiante.promedio > 3.2 || estudiante.semestre >= 4) {
      const nuevoEstudiante = this.estudianteRepository.create(estudiante);
      return await this.estudianteRepository.save(nuevoEstudiante);
    }
    throw new Error(
      'El estudiante no cumple con los requisitos para ser creado.',
    );
  }
}
