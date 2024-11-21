import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt-strategy') {}

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt-strategy') {
  handleRequest(_err, user) {
    return user;
  }
}
