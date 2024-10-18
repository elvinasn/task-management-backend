import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  @ApiResponse({
    status: 404,
    description: 'Record not found',
  })
  @ApiOperation({ summary: 'Get a task' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The updated record',
  })
  @ApiResponse({
    status: 404,
    description: 'Record not found',
  })
  @ApiOperation({ summary: 'Update a task' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: 404,
    description: 'Record not found',
  })
  @ApiResponse({
    status: 204,
    description: 'Record deleted',
  })
  @ApiOperation({ summary: 'Delete a task' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.remove(id);
  }
}
