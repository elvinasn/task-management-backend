import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './project.entity';
import { PhasesService } from 'src/phases/phases.service';
import { Phase } from 'src/phases/phase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Phase])],
  providers: [ProjectsService, PhasesService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
