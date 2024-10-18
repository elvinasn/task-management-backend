import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskPriority, TaskStatus } from '../tasks.enum';

export class UpdateTaskDto {
  @ApiPropertyOptional({
    description: 'Title of the task',
    example: 'Updated Design Homepage',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Task description',
    example: 'Updated design for the homepage',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'The due date of the task',
    example: '2024-11-05',
  })
  @IsDateString()
  @IsOptional()
  dueDate?: Date;

  @ApiPropertyOptional({
    description: 'The current status of the task',
    enum: TaskStatus,
    default: TaskStatus.OPEN,
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @ApiPropertyOptional({
    description: 'The priority level of the task',
    enum: TaskPriority,
    default: TaskPriority.MEDIUM,
  })
  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;
}
