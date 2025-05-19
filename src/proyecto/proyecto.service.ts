import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Long, Repository } from 'typeorm';
import { ProyectoEntity } from './proyecto.entity';
import { EstudianteEntity } from '../estudiante/estudiante.entity';

@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(ProyectoEntity)
    private readonly proyectoRepository: Repository<ProyectoEntity>,
    @InjectRepository(EstudianteEntity)
    private readonly estudianteRepository: Repository<EstudianteEntity>,
  ) {}

  async crearProyecto(proyecto: ProyectoEntity): Promise<ProyectoEntity> {
    if (proyecto.presupuesto <= 0) {
      throw new BadRequestException('El presupuesto debe ser mayor a 0');
    }

    if (!proyecto.titulo || proyecto.titulo.length <= 15) {
      throw new BadRequestException(
        'El título debe tener más de 15 caracteres',
      );
    }

    if (proyecto.lider) {
      const liderExistente = await this.estudianteRepository.findOne({
        where: { id: proyecto.lider.id },
      });
      if (!liderExistente) {
        throw new BadRequestException(
          'El estudiante líder especificado no existe',
        );
      }
    }

    proyecto.estado = proyecto.estado || 0;

    return await this.proyectoRepository.save(proyecto);
  }

  async avanzarProyecto(id: Long): Promise<ProyectoEntity> {
    const proyecto = await this.proyectoRepository.findOne({ where: { id } });

    if (!proyecto) {
      throw new BadRequestException(`Proyecto con id no encontrado`);
    }

    if (proyecto.estado >= 4) {
      throw new BadRequestException(
        'El proyecto ya está en su estado máximo (4)',
      );
    }

    proyecto.estado += 1;
    return await this.proyectoRepository.save(proyecto);
  }

  async findAllEstudiantes(idProyecto: Long): Promise<EstudianteEntity[]> {
    const proyecto = await this.proyectoRepository.findOne({
      where: { id: idProyecto },
      relations: ['lider'],
    });

    if (!proyecto) {
      throw new BadRequestException(`Proyecto con id no encontrado`);
    }

    return proyecto.lider ? [proyecto.lider] : [];
  }

  async findProyectoById(id: Long): Promise<ProyectoEntity> {
    const proyecto = await this.proyectoRepository.findOne({
      where: { id },
      relations: ['lider', 'mentor', 'evaluaciones'],
    });

    if (!proyecto) {
      throw new BadRequestException(`Proyecto con id no encontrado`);
    }

    return proyecto;
  }
}
