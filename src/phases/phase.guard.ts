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
import { UserRole } from 'src/users/user-role.enum';
import { Reflector } from '@nestjs/core';
import { MockPhase, MockProject } from 'src/mock-data';
import { Project } from 'src/projects/project.entity';
import { Phase } from './phase.entity';

export const IncludeMockPhase = Reflector.createDecorator<
  boolean | undefined
>();

@Injectable()
export class PhaseGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(Phase)
    private phasesRepository: Repository<Phase>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user, params } = request;

    const phaseId = params.id;

    const includeMockPhase =
      this.reflector.get<boolean>(IncludeMockPhase, context.getHandler()) ??
      false;

    if (
      !(
        phaseId.match(
          /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
        ) ||
        (includeMockPhase && phaseId === MockProject.id)
      )
    ) {
      throw new BadRequestException('Invalid format of project ID');
    }
    if (includeMockPhase && phaseId === MockProject.id) {
      request.phase = MockPhase;
      return true;
    }
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!phaseId) {
      throw new ForbiddenException('Invalid user or project context');
    }
    const phase = await this.phasesRepository.findOneBy({
      id: phaseId,
    });
    if (!phase) {
      throw new NotFoundException('Project not found');
    }
    request.phase = phase;
    const project = await this.projectsRepository.findOneBy({
      id: phase.projectId,
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

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
