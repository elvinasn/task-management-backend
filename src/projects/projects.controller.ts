import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
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
import { JwtAuthGuard, OptionalJwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from 'src/users/user.entity';
import { IncludeMockProject, ProjectGuard } from './project.guard';
import { GetProject } from './get-project.decorator';
import { Project } from './project.entity';

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
  @UseGuards(JwtAuthGuard)
  create(@GetUser() user: User, @Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(
      createProjectDto.name,
      createProjectDto.description,
      user,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @UseGuards(OptionalJwtAuthGuard)
  findAll(@GetUser() user: User | undefined) {
    return this.projectsService.findAll(user);
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
  @UseGuards(JwtAuthGuard, ProjectGuard)
  findOne(@GetProject() project: Project) {
    return project;
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
  @UseGuards(JwtAuthGuard, ProjectGuard)
  update(
    @GetProject() project: Project,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(
      project.id,
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
  @UseGuards(JwtAuthGuard, ProjectGuard)
  remove(@GetProject() project: Project) {
    return this.projectsService.remove(project.id);
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
  @UseGuards(JwtAuthGuard, ProjectGuard)
  createPhase(
    @GetProject() project: Project,
    @Body() createPhaseDto: CreatePhaseDto,
  ) {
    return this.phasesService.create(
      project.id,
      createPhaseDto.name,
      createPhaseDto.description,
      createPhaseDto.startDate,
      createPhaseDto.endDate,
    );
  }

  @Get(':id/phases')
  @ApiOperation({ summary: 'Get all phases of a project' })
  @IncludeMockProject(true)
  @UseGuards(OptionalJwtAuthGuard, ProjectGuard)
  findAllPhases(@GetProject() project: Project) {
    return this.phasesService.findAllByProject(project.id);
  }
}
