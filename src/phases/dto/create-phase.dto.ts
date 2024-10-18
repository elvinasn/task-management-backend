import { IsString, IsNotEmpty, MaxLength, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePhaseDto {
  @ApiProperty({
    description: 'The name of the phase',
    maxLength: 50,
    example: 'Design Phase',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'A brief description of the phase',
    maxLength: 255,
    example: 'This phase involves the design of the application.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;

  @ApiProperty({
    description: 'The start date of the phase in YYYY-MM-DD format',
    example: '2024-10-20',
  })
  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({
    description: 'The end date of the phase in YYYY-MM-DD format',
    example: '2024-11-10',
  })
  @IsDateString()
  @IsNotEmpty()
  endDate: Date;
}
