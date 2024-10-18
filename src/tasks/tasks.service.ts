import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { Phase } from '../phases/phase.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,

    @InjectRepository(Phase)
    private phasesRepository: Repository<Phase>,
  ) {}

  async create(phaseId: string, createTaskDto: CreateTaskDto): Promise<Task> {
    const phase = await this.phasesRepository.findOne({
      where: { id: phaseId },
    });
    if (!phase) {
      throw new NotFoundException(`Phase with ID ${phaseId} not found`);
    }

    const newTask = this.tasksRepository.create({ ...createTaskDto, phase });
    return this.tasksRepository.save(newTask);
  }

  findAllByPhase(phaseId: string): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { phase: { id: phaseId } },
    });
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    Object.assign(task, updateTaskDto);
    return this.tasksRepository.save(task);
  }

  async remove(id: string): Promise<void> {
    const task = await this.findOne(id);
    await this.tasksRepository.remove(task);
  }
}
