import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskPriority, TaskStatus } from '../tasks.enum';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Title of the task',
    example: 'Design Homepage',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Design the main homepage for the project',
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'The due date of the task',
    example: '2024-11-01',
  })
  @IsDateString()
  dueDate: Date;

  @ApiProperty({
    description: 'The current status of the task',
    enum: TaskStatus,
    default: TaskStatus.OPEN,
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;

  @ApiProperty({
    description: 'The priority level of the task',
    enum: TaskPriority,
    default: TaskPriority.MEDIUM,
  })
  @IsEnum(TaskPriority)
  @IsOptional()
  priority: TaskPriority;
}
