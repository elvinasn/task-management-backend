import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { Project } from '../projects/project.entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Task } from 'src/tasks/task.entity';

@Entity()
export class Phase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Exclude()
  @ApiHideProperty()
  @ManyToOne(() => Project, (project) => project.phases, {
    onDelete: 'CASCADE',
  })
  project: Project;

  @RelationId((phase: Phase) => phase.project)
  projectId: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ApiHideProperty()
  @Exclude()
  @OneToMany(() => Task, (task) => task.phase, { cascade: true })
  tasks: Task[];
}
