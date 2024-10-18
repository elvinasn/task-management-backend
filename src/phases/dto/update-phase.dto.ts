import { IsString, IsOptional, MaxLength, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePhaseDto {
  @ApiPropertyOptional({
    description: 'The name of the phase',
    maxLength: 50,
    example: 'Updated Design Phase',
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  name?: string;

  @ApiPropertyOptional({
    description: 'A brief description of the phase',
    maxLength: 255,
    example: 'Updated phase description',
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;

  @ApiPropertyOptional({
    description: 'The start date of the phase in YYYY-MM-DD format',
    example: '2024-10-25',
  })
  @IsDateString()
  @IsOptional()
  startDate?: Date;

  @ApiPropertyOptional({
    description: 'The end date of the phase in YYYY-MM-DD format',
    example: '2024-11-15',
  })
  @IsDateString()
  @IsOptional()
  endDate?: Date;
}
