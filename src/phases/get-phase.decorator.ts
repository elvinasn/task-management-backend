import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Phase } from './phase.entity';

export const GetPhase = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): Phase => {
    const request = ctx.switchToHttp().getRequest();
    return request.phase;
  },
);
