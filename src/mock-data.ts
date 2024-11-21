import { Phase } from './phases/phase.entity';
import { Project } from './projects/project.entity';
import { Task } from './tasks/task.entity';
import { TaskPriority, TaskStatus } from './tasks/tasks.enum';
import { UserRole } from './users/user-role.enum';

export const MockProject: Project = {
  id: 'mock-project-id',
  createdAt: new Date(),
  description: 'Example Project',
  name: 'Example Project',
  phases: [],
  updatedAt: new Date(),
  userId: 'mock-user-id',
  user: {
    id: 'mock-user-id',
    email: 'mock@gmail.com',
    created_at: new Date(),
    image_url: undefined,
    full_name: 'Mock User',
    password: 'mock-password',
    projects: [],
    role: UserRole.GUEST,
    updated_at: new Date(),
  },
};

export const MockPhase: Phase = {
  createdAt: new Date(),
  description: 'Example Phase',
  endDate: new Date(),
  id: 'mock-phase-id',
  name: 'Example Phase',
  projectId: 'mock-project-id',
  project: MockProject,
  startDate: new Date(),
  tasks: [],
  updatedAt: new Date(),
};

export const MockTask: Task = {
  dueDate: new Date(),
  priority: TaskPriority.LOW,
  status: TaskStatus.IN_PROGRESS,
  title: 'Example Task',
  createdAt: new Date(),
  description: 'Example Task',
  id: 'mock-task-id',
  phaseId: 'mock-phase-id',
  projectId: 'mock-project-id',
  phase: MockPhase,
  updatedAt: new Date(),
};
