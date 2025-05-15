import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { ProfesorModule } from './profesor/profesor.module';
import { EvaluacionModule } from './evaluacion/evaluacion.module';
import { log } from 'console';

@Module({
  imports: [
    EstudianteModule,
    ProyectoModule,
    ProfesorModule,
    EvaluacionModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'parcial',
      entities: [
        EstudianteModule,
        ProyectoModule,
        ProfesorModule,
        EvaluacionModule,
      ],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
      logging: true,
      autoLoadEntities: true,
    }),
  ],
})
export class AppModule {}
