import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  create(name: string, description: string): Promise<Project> {
    const newProject = this.projectsRepository.create({ name, description });
    return this.projectsRepository.save(newProject);
  }

  findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectsRepository.findOneBy({ id });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async update(
    id: string,
    name?: string,
    description?: string,
  ): Promise<Project> {
    const project = await this.findOne(id);
    project.name = name ?? project.name;
    project.description = description ?? project.description;
    return this.projectsRepository.save(project);
  }

  async remove(id: string): Promise<void> {
    const project = await this.findOne(id);
    await this.projectsRepository.remove(project);
  }
}
