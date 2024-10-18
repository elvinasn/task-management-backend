import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    description: 'The name of the project',
    maxLength: 50,
    example: 'Project Alpha',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'A brief description of the project',
    maxLength: 255,
    example: 'This project is about building a task management app.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;
}
