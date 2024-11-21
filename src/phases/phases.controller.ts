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
  UseGuards,
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
import { PhaseGuard } from './phase.guard';
import { JwtAuthGuard, OptionalJwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Phase } from './phase.entity';
import { GetPhase } from './get-phase.decorator';

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
  @UseGuards(JwtAuthGuard, PhaseGuard)
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
  @UseGuards(JwtAuthGuard, PhaseGuard)
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
  @UseGuards(JwtAuthGuard, PhaseGuard)
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
  @UseGuards(JwtAuthGuard, PhaseGuard)
  createTask(@GetPhase() phase: Phase, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(phase.id, createTaskDto, phase.projectId);
  }

  @Get(':id/tasks')
  @ApiOperation({ summary: 'Get all tasks for a phase' })
  @UseGuards(OptionalJwtAuthGuard, PhaseGuard)
  findAllTasks(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.findAllByPhase(id);
  }
}
