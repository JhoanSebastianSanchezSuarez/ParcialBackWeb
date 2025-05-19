/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';
import { EstudianteEntity } from './estudiante.entity';
import { EstudianteService } from './estudiante.service';
import { faker } from '@faker-js/faker';
import { ProfesorEntity } from 'src/profesor/profesor.entity';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let repository: Repository<EstudianteEntity>;
  let estudianteList: EstudianteEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EstudianteService],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repository = module.get<Repository<EstudianteEntity>>(
      getRepositoryToken(EstudianteEntity),
    );
    await seedEstudiantes();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const seedEstudiantes = async () => {
    await repository.clear();
    estudianteList = [];
    for (let i = 0; i < 5; i++) {
      const estudiante: EstudianteEntity = await repository.save({
        nombre: faker.person.fullName(),
        cedula: faker.number.int({ min: 100000000, max: 999999999 }),
        semestre: faker.number.int({ min: 4, max: 10 }),
        programa: faker.person.jobTitle(),
        promedio: faker.number.int({ min: 3.2, max: 5 }),
        proyectos: [],
      });
      estudianteList.push(estudiante);
    }
  };

  it('Crear Estudiante', async () => {
    const estudiante: EstudianteEntity = {
      id: 1 as any,
      nombre: faker.person.fullName(),
      cedula: faker.number.int({ min: 100000000, max: 999999999 }),
      semestre: faker.number.int({ min: 4, max: 10 }),
      programa: faker.person.jobTitle(),
      promedio: faker.number.int({ min: 3.2, max: 5 }),
      proyectos: [],
    };

    const newEstudiante: EstudianteEntity =
      await service.crearEstudiante(estudiante);
    expect(newEstudiante).not.toBeNull();

    const storedEstudiante: EstudianteEntity | null = await repository.findOne({
      where: { id: newEstudiante.id },
      relations: ['proyectos'],
    });
    expect(storedEstudiante).not.toBeNull();
    expect(storedEstudiante!.nombre).toEqual(estudiante.nombre);
    expect(storedEstudiante!.cedula).toEqual(estudiante.cedula);
    expect(storedEstudiante!.semestre).toEqual(estudiante.semestre);
    expect(storedEstudiante!.programa).toEqual(estudiante.programa);
    expect(storedEstudiante!.promedio).toEqual(estudiante.promedio);
    expect(storedEstudiante!.proyectos).toEqual(estudiante.proyectos);
  });

  it('No Crear Estudiante', async () => {
    const estudiante: EstudianteEntity = {
      id: 2 as any,
      nombre: faker.person.fullName(),
      cedula: faker.number.int({ min: 100000000, max: 999999999 }),
      semestre: faker.number.int({ min: 1, max: 10 }),
      programa: faker.person.jobTitle(),
      promedio: faker.number.int({ min: 1, max: 5 }),
      proyectos: [],
    };
    await expect(() =>
      service.crearEstudiante(estudiante),
    ).rejects.toHaveProperty([], {
      message: [
        'El estudiante no cumple con los requisitos (promedio > 3.2 y semestre ≥ 4)',
      ],
      type: 1,
    });
    const storedEstudiante: EstudianteEntity | null = await repository.findOne({
      where: { id: estudiante.id },
      relations: ['proyectos'],
    });
    expect(storedEstudiante).toBeNull();
  });

  it('Eliminar Estudiante', async () => {
    const estudiante: EstudianteEntity = estudianteList[0];
    await service.eliminarEstudiante(estudiante.id);
    const deletedEstudiante: EstudianteEntity | null = await repository.findOne(
      { where: { id: estudiante.id }, relations: ['proyectos'] },
    );
    expect(deletedEstudiante).toBeNull();
  });

  it('eliminar un estudiante', async () => {
    const estudiante: EstudianteEntity = estudianteList[0];
    await service.eliminarEstudiante(estudiante.id);
    const deletedEstudiante: EstudianteEntity | null = await repository.findOne(
      { where: { id: estudiante.id } },
    );
    expect(deletedEstudiante).toBeNull();
  });

  it('Eliminar Estudiante con Proyectos', async () => {
    const estudiante: EstudianteEntity = estudianteList[0];
    estudiante.proyectos = [
      {
        id: 1 as any,
        titulo: faker.lorem.sentence(),
        descripcion: faker.lorem.paragraph(),
        presupuesto: faker.number.int({ min: 1000, max: 10000 }),
        estado: 1,
        fechaInicio: new Date(),
        fechaFin: new Date(),
        evaluaciones: [],
        lider: estudiante,
        mentor: new ProfesorEntity(),
      } as any,
    ];
    await repository.save(estudiante);
    await expect(() =>
      service.eliminarEstudiante(estudiante.id),
    ).rejects.toHaveProperty('response', {
      statusCode: 412,
      message: [
        'No se puede eliminar el estudiante porque tiene proyectos activos',
      ],
      error: 'Precondition Failed',
    });
  });
});