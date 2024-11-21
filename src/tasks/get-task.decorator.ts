import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Task } from './task.entity';

export const GetTask = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): Task => {
    const request = ctx.switchToHttp().getRequest();
    return request.task;
  },
);
