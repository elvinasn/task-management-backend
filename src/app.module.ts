import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';
import { PhasesModule } from './phases/phases.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'test',
      password: 'test23',
      database: 'task_management',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProjectsModule,
    PhasesModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
