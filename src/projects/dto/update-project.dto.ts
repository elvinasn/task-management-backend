import { IsString, IsOptional, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProjectDto {
  @ApiPropertyOptional({
    description: 'The name of the project',
    maxLength: 50,
    example: 'Updated Project Alpha',
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  name?: string;

  @ApiPropertyOptional({
    description: 'A brief description of the project',
    maxLength: 255,
    example: 'Updated project description',
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;
}
