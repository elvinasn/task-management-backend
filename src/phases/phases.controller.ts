import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  Post,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PhasesService } from './phases.service';
import { UpdatePhaseDto } from './dto/update-phase.dto';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { TasksService } from 'src/tasks/tasks.service';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';

@ApiTags('Phases')
@Controller('phases')
export class PhasesController {
  constructor(
    private readonly phasesService: PhasesService,
    private readonly tasksService: TasksService,
  ) {}

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  @ApiNotFoundResponse({
    description: 'Record not found',
  })
  @ApiOperation({ summary: 'Get a phase' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.phasesService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The updated record',
  })
  @ApiNotFoundResponse({
    description: 'Record not found',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Unprocessable Entity',
  })
  @ApiOperation({ summary: 'Update a phase' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePhaseDto: UpdatePhaseDto,
  ) {
    return this.phasesService.update(
      id,
      updatePhaseDto.name,
      updatePhaseDto.description,
      updatePhaseDto.startDate,
      updatePhaseDto.endDate,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a phase' })
  @ApiNotFoundResponse({
    description: 'Record not found',
  })
  @ApiResponse({
    status: 204,
    description: 'Record deleted successfully',
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.phasesService.remove(id);
  }

  @Post(':id/tasks')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiOperation({ summary: 'Create a task' })
  createTask(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(id, createTaskDto);
  }

  @Get(':id/tasks')
  @ApiOperation({ summary: 'Get all tasks for a phase' })
  findAllTasks(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.findAllByPhase(id);
  }
}
