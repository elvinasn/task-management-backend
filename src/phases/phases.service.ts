import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Phase } from './phase.entity';
import { Project } from '../projects/project.entity';
import { MockPhase, MockProject } from 'src/mock-data';

@Injectable()
export class PhasesService {
  constructor(
    @InjectRepository(Phase)
    private phasesRepository: Repository<Phase>,

    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create(
    projectId: string,
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Phase> {
    const project = await this.projectsRepository.findOneBy({ id: projectId });
    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }
    //check if start date is before end date
    if (startDate > endDate) {
      throw new UnprocessableEntityException(
        'Start date must be before end date',
      );
    }

    const newPhase = this.phasesRepository.create({
      name,
      description,
      startDate,
      endDate,
      project,
    });
    return this.phasesRepository.save(newPhase);
  }

  async update(
    id: string,
    name?: string,
    description?: string,
    startDate?: Date,
    endDate?: Date,
  ): Promise<Phase> {
    //check if start date is before end date
    if (startDate && startDate && startDate > endDate) {
      throw new UnprocessableEntityException(
        'Start date must be before end date',
      );
    }
    const phase = await this.findOne(id);
    phase.name = name ?? phase.name;
    phase.description = description ?? phase.description;
    phase.startDate = startDate ?? phase.startDate;
    phase.endDate = endDate ?? phase.endDate;
    return this.phasesRepository.save(phase);
  }
  async findAllByProject(projectId: string): Promise<Phase[]> {
    if (projectId === MockProject.id) {
      return [MockPhase];
    }
    const project = await this.projectsRepository.findOneBy({ id: projectId });
    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    return this.phasesRepository.find({
      where: { project: { id: projectId } },
    });
  }

  async findOne(id: string): Promise<Phase> {
    const phase = await this.phasesRepository.findOneBy({ id });
    if (!phase) {
      throw new NotFoundException(`Phase with ID ${id} not found`);
    }
    return phase;
  }

  async remove(id: string): Promise<void> {
    const phase = await this.findOne(id);
    await this.phasesRepository.remove(phase);
  }
}
