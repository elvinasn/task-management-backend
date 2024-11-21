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
import { Project } from 'src/projects/project.entity';
import { Task } from './task.entity';

@Injectable()
export class TaskGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user, params } = request;

    const taskId = params.id;

    if (
      !taskId.match(
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
      )
    ) {
      throw new BadRequestException('Invalid format of project ID');
    }

    if (!user) {
      throw new UnauthorizedException();
    }
    if (!taskId) {
      throw new ForbiddenException('Invalid user or project context');
    }
    const task = await this.tasksRepository.findOneBy({
      id: taskId,
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    request.task = task;
    const project = await this.projectsRepository.findOneBy({
      id: task.projectId,
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
