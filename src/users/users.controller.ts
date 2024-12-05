import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { GetUser } from './get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  @Get()
  getUser(@GetUser() user: User): User {
    return {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      image_url: user.image_url,
      role: user.role,
    } as User;
  }
}
