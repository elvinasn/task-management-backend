import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { PhasesService } from 'src/phases/phases.service';
import { CreatePhaseDto } from 'src/phases/dto/create-phase.dto';

@Controller('projects')
@ApiTags('Projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly phasesService: PhasesService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiOperation({ summary: 'Create a project' })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(
      createProjectDto.name,
      createProjectDto.description,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  @ApiResponse({
    status: 404,
    description: 'Record not found',
  })
  @ApiOperation({ summary: 'Get a project by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Record not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiOperation({ summary: 'Update a project' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(
      id,
      updateProjectDto.name,
      updateProjectDto.description,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Record not found',
  })
  @ApiOperation({ summary: 'Delete a project' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.remove(id);
  }

  @Post(':id/phases')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnprocessableEntityResponse({
    description: 'Start date must be before end date',
  })
  @ApiOperation({ summary: 'Create a phase' })
  createPhase(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createPhaseDto: CreatePhaseDto,
  ) {
    return this.phasesService.create(
      id,
      createPhaseDto.name,
      createPhaseDto.description,
      createPhaseDto.startDate,
      createPhaseDto.endDate,
    );
  }

  @Get(':id/phases')
  @ApiOperation({ summary: 'Get all phases of a project' })
  findAllPhases(@Param('id', ParseUUIDPipe) id: string) {
    return this.phasesService.findAllByProject(id);
  }
}
