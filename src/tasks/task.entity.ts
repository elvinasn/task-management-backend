import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  RelationId,
} from 'typeorm';
import { Phase } from '../phases/phase.entity';
import { TaskPriority, TaskStatus } from './tasks.enum';
import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.OPEN })
  status: TaskStatus;

  @Column({ type: 'enum', enum: TaskPriority, default: TaskPriority.MEDIUM })
  priority: TaskPriority;

  @Exclude()
  @ApiHideProperty()
  @ManyToOne(() => Phase, (phase) => phase.tasks, { onDelete: 'CASCADE' })
  phase: Phase;

  @RelationId((task: Task) => task.phase)
  phaseId: string;

  @Column({ nullable: false, type: 'uuid' })
  projectId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
