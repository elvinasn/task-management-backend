import { IsEnum, IsString } from 'class-validator';
import { UserRole } from 'src/users/user-role.enum';

export class AccessTokenPayloadDto {
  @IsString()
  sub: string;

  @IsString()
  email: string;

  @IsEnum({
    enum: UserRole,
  })
  role: UserRole;
}
