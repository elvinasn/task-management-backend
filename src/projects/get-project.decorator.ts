import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Project } from './project.entity';

export const GetProject = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): Project => {
    const request = ctx.switchToHttp().getRequest();
    return request.project;
  },
);
