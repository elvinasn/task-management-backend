import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { AccessTokenPayloadDto } from './dto/access-token-payload.dto';
import * as bcrypt from 'bcrypt';
import { AccessTokenDto } from './dto/access-tokend.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/users/user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<AccessTokenDto> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid email or password');
    }

    const payload: AccessTokenPayloadDto = {
      sub: user.id,
      email: user.email,
      role: UserRole.USER,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signUpDto: SignUpDto): Promise<AccessTokenDto> {
    if (signUpDto.password !== signUpDto.password_repeat) {
      throw new BadRequestException('Passwords do not match');
    }
    const existing = await this.usersService.findOneByEmail(signUpDto.email);

    if (existing) {
      throw new BadRequestException('User already exists');
    }

    const user = await this.usersService.createUser(
      {
        email: signUpDto.email,
        full_name: signUpDto.full_name,
      },
      signUpDto.password,
    );

    const payload: AccessTokenPayloadDto = {
      sub: user.id,
      email: user.email,
      role: UserRole.USER,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
