import { Module } from '@nestjs/common';
import { PhasesService } from './phases.service';
import { PhasesController } from './phases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phase } from './phase.entity';
import { Project } from 'src/projects/project.entity';
import { Task } from 'src/tasks/task.entity';
import { TasksService } from 'src/tasks/tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Phase, Project, Task])],
  providers: [PhasesService, TasksService],
  controllers: [PhasesController],
})
export class PhasesModule {}
