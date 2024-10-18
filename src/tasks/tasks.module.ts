import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Phase } from 'src/phases/phase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Phase, Task])],

  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
