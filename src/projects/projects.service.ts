import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { User } from 'src/users/user.entity';
import { UserRole } from 'src/users/user-role.enum';
import { MockProject } from 'src/mock-data';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  create(name: string, description: string, user: User): Promise<Project> {
    const newProject = this.projectsRepository.create({
      name,
      description,
      user,
    });
    return this.projectsRepository.save(newProject);
  }

  async findAll(user: User | undefined): Promise<Project[]> {
    switch (user?.role) {
      case UserRole.ADMIN:
        return this.projectsRepository.find();
      case UserRole.USER:
        return this.projectsRepository.find({
          where: { user: { id: user.id } },
        });
      default:
        return [MockProject];
    }
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
