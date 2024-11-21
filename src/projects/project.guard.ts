import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { UserRole } from 'src/users/user-role.enum';
import { Reflector } from '@nestjs/core';
import { MockProject } from 'src/mock-data';

export const IncludeMockProject = Reflector.createDecorator<
  boolean | undefined
>();

@Injectable()
export class ProjectGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user, params } = request;

    const projectId = params.id;

    const includeMockProject =
      this.reflector.get<boolean>(IncludeMockProject, context.getHandler()) ??
      false;

    // check if projectId is UUID
    if (
      !(
        projectId.match(
          /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
        ) ||
        (includeMockProject && projectId === MockProject.id)
      )
    ) {
      throw new BadRequestException('Invalid format of project ID');
    }
    if (includeMockProject && projectId === MockProject.id) {
      request.project = MockProject;
      return true;
    }
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!projectId) {
      throw new ForbiddenException('Invalid user or project context');
    }
    const project = await this.projectsRepository.findOneBy({
      id: projectId,
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    request.project = project;

    switch (user.role) {
      case UserRole.GUEST:
        return false;
      case UserRole.USER:
        return project.userId === user.id;
      case UserRole.ADMIN:
        return true;
    }
  }
}
